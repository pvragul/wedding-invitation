"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EmojiShower from "./EmojiShower";

export default function RsvpForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showerKey, setShowerKey] = useState(0);
  const [prevAttendance, setPrevAttendance] = useState<string | null>(null);

  const formSchema = z.object({
    name: z.string().min(2, { message: t("errors_name") }),
    email: z
      .string()
      .email({ message: t("errors_email") })
      .or(z.literal(""))
      .optional(),
    phone: z.string().regex(/^[0-9]{10}$/, { message: t("errors_phone") }),
    attendance: z.enum(["yes", "no", "maybe"], {
      message: t("errors_attending"),
    }),
    guestsCount: z
      .number()
      .min(1, { message: t("errors_guests") })
      .max(10)
      .optional(),
    dietary: z.string().optional(),
    song: z.string().optional(),
    accessibility: z.string().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: undefined,
      guestsCount: 1,
    },
  });

  const attendance = watch("attendance");

  useEffect(() => {
    if (attendance && attendance !== prevAttendance) {
      setShowerKey((prev) => prev + 1);
      setPrevAttendance(attendance);
    }
  }, [attendance, prevAttendance]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setIsSuccess(true);
    } catch (error) {
      setErrorMsg("Failed to submit RSVP. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl shadow-sm border border-stone-100"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
        <h3 className="font-serif text-3xl mb-4 text-stone-800">
          {t("success_title")}
        </h3>
        <p className="text-stone-600 text-lg">{t("success_msg")}</p>
      </motion.div>
    );
  }

  return (
    <section className="py-24 bg-white" id="rsvp">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              {t("rsvp_title")}
            </h2>
            <p className="text-stone-600">{t("rsvp_subtitle")}</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-stone-50 p-8 md:p-12 rounded-2xl border border-stone-100 shadow-sm"
          >
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm text-center">
                {errorMsg}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">
                  {t("guest_names")}
                </label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all"
                  placeholder={t("guest_names_ph")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">
                  {t("phone")}
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                {t("email")}
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-stone-700">
                {t("attending")}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["yes", "no", "maybe"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center justify-center p-4 rounded-md border cursor-pointer transition-all ${
                      attendance === opt
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-stone-200 bg-white text-stone-600 hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={opt}
                      {...register("attendance")}
                      className="hidden"
                    />
                    <span className="capitalize">{t(opt as any)}</span>
                  </label>
                ))}
              </div>
              {errors.attendance && (
                <p className="text-red-500 text-xs">
                  {errors.attendance.message}
                </p>
              )}
            </div>

            {attendance === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-6 overflow-hidden"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    {t("guests_count")}
                  </label>
                  <input
                    {...register("guestsCount")}
                    onChange={(val) => {
                      if (
                        val.target.value === "" ||
                        parseInt(val.target.value) < 0
                      ) {
                        register("guestsCount").onChange({
                          target: {
                            value: 0,
                          },
                        });
                      } else {
                        register("guestsCount").onChange({
                          target: { value: parseInt(val.target.value) },
                        });
                      }
                    }}
                    type="number"
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all"
                  />
                  {errors.guestsCount && (
                    <p className="text-red-500 text-xs">
                      {errors.guestsCount.message}
                    </p>
                  )}
                </div>

                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">{t("dietary")}</label>
                  <input
                    {...register("dietary")}
                    className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all"
                    placeholder={t("dietary_ph")}
                  />
                </div> */}
              </motion.div>
            )}

            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                {t("accessibility")}
              </label>
              <input
                {...register("accessibility")}
                className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all"
              />
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                {t("song")}
              </label>
              <textarea
                {...register("song")}
                rows={3}
                className="w-full px-4 py-3 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white rounded-md font-medium text-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </button>
          </form>
        </motion.div>
      </div>
      {attendance && (
        <EmojiShower
          key={showerKey}
          type={attendance as "yes" | "no" | "maybe"}
        />
      )}
    </section>
  );
}
