import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";
import AnimalForm from "./AnimalForm";

interface Animal {
  id: number;
  name: string;
  type: string;
}

const Animals: React.FC = () => {
  const [animals] = useState<Animal[]>([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div className="flex gap-2">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add Animal"}
          </Button>
          <Button variant="outline">Add Group</Button>
          <Button variant="outline">...</Button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-1/3">
          <div className="relative flex-1">
            <Input type="text" placeholder="Search Animals" className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      {/* Form */}
      {showForm && <AnimalForm />}

      {/* Empty State */}
      {!showForm && animals.length === 0 && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-12 text-center rounded-md">
          <div className="text-6xl mb-4 text-gray-400">🏷️</div>
          <h2 className="text-lg font-medium text-gray-700">No animals yet?</h2>
          <p className="text-gray-500 mb-2">
            Add a new animal or import your current animals and they’ll show up
            here.
          </p>
          <a
            href="#"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Check out this Getting Started Guide
          </a>
        </div>
      )}
    </div>
  );
};

export default Animals;
