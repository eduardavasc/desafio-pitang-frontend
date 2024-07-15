import * as z from "zod";

export const scheduleSchema = z.object({
  "patientName": z.string().min(5, "Obrigatório ter mais de 5 caracteres"),
  "patientBirthDate": z
    .date()
    .nullable()
    .refine(
      (date) => {
        return !!date;
      },
      {
        message: "Data de nascimento é obrigatória",
      }
    ),
  "scheduledDate": z
    .date()
    .nullable()
    .refine(
      (date) => {
        return !!date;
      },
      {
        message: "Data de agendamento é obrigatória",
      }
    ),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;
