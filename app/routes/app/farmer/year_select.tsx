import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/form/button";
import WithModal from "~/components/pages/WithModal";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const crop = url.searchParams.get("crop");
  return { crop };
}

export function YearSelectionCard() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Please select an year.
      </h3>
      <div>
        <Link
          to={`/app/farmer/crop?name=${
            data.crop
          }&year=${new Date().getFullYear()}`}
        >
          <Button>Current Year</Button>
        </Link>
      </div>
    </div>
  );
}

export default function YearSelectionModel() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <WithModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Year Selection"
    >
        <YearSelectionCard />
    </WithModal>
  );
}
