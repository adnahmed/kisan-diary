import { Prisma } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { isError } from "lodash/fp";
import { nanoid } from "nanoid";
import { prisma } from "~/db.server";
import { createNewSheet } from "~/helpers/FDSheet";
import { getUser } from "~/session.server";
import fetchFarm from "../../models/farm.server";

export async function action({ request }: ActionArgs) {
  const user = await getUser(request);
  if (!user) throw new Error("Unauthorized");
  const farm = await fetchFarm(user);
  if (!farm) throw new Error("Farm not found");
  const formData = await request.formData();
  const growingYear = formData.get("growingYear")?.toString();
  const type = formData.get("type")?.toString();
  const newSheetId = nanoid();
  try {
    if (!type || !growingYear) throw new Error("Insufficient or invalid Data");
    const growingYearI = parseInt(growingYear);
    await prisma.financialData.create({
      data: {
        path: newSheetId,
        crop: {
          connect: {
            name: type,
          },
        },
        farm: {
          connect: {
            id: farm.id,
          },
        },
        year_start: growingYearI,
        year_end: growingYearI + 1,
      },
    });
    createNewSheet(newSheetId);
    return json({ error: null, ok: true });
  } catch (err) {
    if (isError(err)) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          return json({ error: "Sorry, the record already exists", ok: false });
      }
      return json({ error: err.message, ok: false });
    }
    return json({ error: err, ok: false });
  }
}
