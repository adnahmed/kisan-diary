import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { route } from "routes-gen";
import CropsHeader from "~/components/pages/CropsHeader";
import { prisma } from "~/db.server";
import fetchFarm from "~/models/farm.server";
import { getUser } from "~/session.server";
import { GlassCard } from "~/components/GlassCard";
import Button from "~/components/form/button";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Error("Unauthorized!");
  const farm = await fetchFarm(user);
  if (!farm) throw new Error("Please add farm information.");
  return typedjson({
    crops: await prisma.crop.findMany({
      where: {
        farms: {
          every: {
            id: farm.id,
          },
        },
      },
      orderBy: { name: 'asc' }
    }),
  });
}

export default function Crops() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in relative z-10 w-full max-w-7xl mx-auto">
      <CropsHeader />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-md border-b border-white/20 pb-2">
          Your Crops
        </h2>
        <AllCropsList />
      </div>
    </div>
  );
}

function AllCropsList() {
  const data = useTypedLoaderData<typeof loader>();
  
  if (data.crops.length === 0) {
    return (
      <GlassCard className="p-8 text-center text-surface-600">
        <p>No crops added yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.crops.map((c) => (
        <GlassCard 
          key={c.id} 
          className="p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100/20 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-primary-100/30" />
            
          <Link
            to={route(`/farmer/crop/:cropId`, { cropId: c.id })}
            className="text-xl font-bold text-primary-800 hover:text-primary-600 mb-4 z-10 block"
          >
            {c.name}
          </Link>
          
          <div className="flex justify-end pt-4 border-t border-surface-200">
             <Button 
               className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 text-xs px-3 py-1 h-auto shadow-none w-auto"
               onClick={(e) => {
                 e.preventDefault();
                 // Add delete handler here properly with a Form
                 if(confirm("Are you sure?")) {
                   // Submit delete form
                 }
               }}
             >
               Delete
             </Button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
