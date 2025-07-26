"use client";

import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  CloseButton,
  RatingGroup,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toaster, Toaster } from "@/components/ui/toaster";
import { fetchCreateMovie } from "@/app/lib/movie";
import { useRouter } from "next/navigation";

type FormValues = {
  id?: number;
  title: string;
  overview: string;
  year: number;
  rating: number;
  genre: string;
};

export function CreateMovieDialog() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        rating: rating,
      };
      const responseCreate = await fetchCreateMovie(payload);

      if (responseCreate.status !== 201) {
        toaster.error({
          title: "Error al crear la película",
          description: "Ocurrió un error al crear la película.",
          type: "error",
        });
        return;
      }
      toaster.success({
        title: "Película creada",
        description: "La película se ha creado correctamente.",
        type: "success",
      });
      reset();
      setRating(0);
      router.refresh();
    } catch (error) {
      toaster.error({
        title: "Error al crear la película catch",
        description:
          "No se pudo crear la película. Por favor, inténtalo de nuevo." + error,
        type: "error",
      });
      return;
    }
  });

  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
      <Dialog.Trigger asChild>
        <Button colorPalette="green">Crear Movie</Button>
      </Dialog.Trigger>
      <Toaster />
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Crear nueva película</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack>
                <form onSubmit={onSubmit} id="create-movie-form">
                  <Field.Root invalid={!!errors.title}>
                    <Field.Label>
                      Título
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="Título de la película"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "El título es obligatorio",
                        },
                      })}
                    />
                    {errors.title?.type === "required" && (
                      <Field.ErrorText>{errors.title.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.overview}>
                    <Field.Label>Descripción general</Field.Label>
                    <Input
                      placeholder="Descripción general"
                      {...register("overview", {
                        required: "La descripción general es obligatoria.",
                      })}
                    />
                    {errors.overview && (
                      <Field.ErrorText>
                        {errors.overview.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.year}>
                    <Field.Label>Año</Field.Label>
                    <Input
                      type="number"
                      placeholder="Ej: 2025"
                      {...register("year", {
                        required: "El año es obligatorio.",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.year && (
                      <Field.ErrorText>{errors.year.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.genre}>
                    <Field.Label>Género</Field.Label>
                    <Input
                      placeholder="Ej: Acción, Comedia"
                      {...register("genre", {
                        required: "El género es obligatorio.",
                      })}
                    />
                    {errors.genre && (
                      <Field.ErrorText>{errors.genre.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.rating}>
                    <Field.Label>Calificación</Field.Label>
                    <RatingGroup.Root
                      count={10}
                      value={rating}
                      onValueChange={(e) => setRating(e.value)}
                    >
                      <RatingGroup.HiddenInput />
                      <RatingGroup.Control />
                    </RatingGroup.Root>
                  </Field.Root>
                </form>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>

              <Button
                colorPalette="green"
                type="submit"
                form="create-movie-form"
                loading={isSubmitting}
              >
                Guardar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
