import * as z from "zod";

export const scheduleSchema = z.object({
  "patient-name": z.string().min(5, "Nome completo é obrigatório"),
  "data-de-nascimento": z
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
  "data-agendamento": z
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
