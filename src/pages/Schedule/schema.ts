import * as z from "zod";

export const scheduleSchema = z.object({
<<<<<<< Updated upstream
  "patient-name": z.string().min(5, "Nome completo é obrigatório"),
  "data-de-nascimento": z
=======
  "patientName": z.string().min(5, "Obrigatório ter mais de 5 caracteres"),
  "patientBirthDate": z
>>>>>>> Stashed changes
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
