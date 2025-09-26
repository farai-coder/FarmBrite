import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import DatePicker from "react-datepicker";
import { differenceInDays, differenceInYears, format } from "date-fns";
import {
  Calendar,
  User,
  Scale,
  MapPin,
  Baby,
  Info,
  ClipboardList,
  CheckSquare,
  Syringe,
  Package,
  BarChart3,
  HeartHandshake,
  Users,
  GitBranch,
  PieChart,
  Calculator,
  Camera,
  Folder,
  Leaf,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
}

interface AnimalData {
  name: string;
  animalType: string;
  tagNumber: string;
  status: string;
  location: string;
  sex: string;
  breed: string;
  coloring: string;
  weight: string;
  height: string;
  retentionScore: string;
  birthDate: Date | null;
  birthWeight: string;
  methodAcquired: string;
  estimatedValue: string;
  electronicId: string;
  description: string;
}

const AnimalForm: React.FC = () => {
  const [showDisplay, setShowDisplay] = useState(false);
  const [animalData, setAnimalData] = useState<AnimalData>({
    name: "bonus",
    animalType: "Cattle",
    tagNumber: "TAG-001",
    status: "Active",
    location: "North Pasture",
    sex: "Male",
    breed: "Hard Mashona",
    coloring: "BROWN",
    weight: "457.0",
    height: "",
    retentionScore: "14.0",
    birthDate: new Date(2025, 8, 23),
    birthWeight: "457.0",
    methodAcquired: "raised on farm",
    estimatedValue: "3.00",
    electronicId: "xg ED: fragile",
    description: "good shape",
  });

  const handleInputChange = (field: keyof AnimalData, value: string) => {
    setAnimalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = () => {
    setShowDisplay(true);
  };

  const calculateAge = () => {
    if (!animalData.birthDate) return null;
    const now = new Date();
    const totalDays = differenceInDays(now, animalData.birthDate);
    const years = differenceInYears(now, animalData.birthDate);
    const remainingDaysAfterYears = totalDays - years * 365;
    const weeks = Math.floor(remainingDaysAfterYears / 7);
    const days = remainingDaysAfterYears - weeks * 7;
    return { days: Math.floor(days), weeks, years, totalDays };
  };

  const age = calculateAge();

  const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick, placeholder }, ref) => (
      <div className="relative">
        <input
          ref={ref}
          value={value}
          onClick={onClick}
          readOnly
          placeholder={placeholder}
          className="border rounded p-2 w-full pr-10 cursor-pointer"
        />
        <Calendar
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    )
  );

  // Dashboard modules data
  const dashboardModules = [
    { id: "notes", icon: ClipboardList, title: "Notes", count: 3 },
    { id: "tasks", icon: CheckSquare, title: "Tasks", count: 2 },
    { id: "treatments", icon: Syringe, title: "Treatments", count: 5 },
    { id: "inputs", icon: Package, title: "Inputs", count: 8 },
    { id: "measurements", icon: BarChart3, title: "Measurements", count: 12 },
    { id: "breeding", icon: HeartHandshake, title: "Breeding", count: 2 },
    { id: "offspring", icon: Users, title: "Offspring", count: 0 },
    { id: "siblings", icon: GitBranch, title: "Siblings", count: 0 },
    { id: "genealogy", icon: GitBranch, title: "Genealogy", count: 15 },
    { id: "yield", icon: PieChart, title: "Yield", count: 7 },
    { id: "grazing", icon: Leaf, title: "Grazing", count: 23 },
    { id: "accounting", icon: Calculator, title: "Accounting", count: 18 },
    { id: "photos", icon: Camera, title: "Photos", count: 6 },
    { id: "files", icon: Folder, title: "Files", count: 4 },
  ];

  if (showDisplay) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {animalData.name}
              </h1>
              <p className="text-gray-600">
                {animalData.animalType} • {animalData.breed}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="font-semibold">{animalData.status}</span>
              </div>
              <Button variant="outline">Back to List</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Dashboard Modules */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {dashboardModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {module.title}
                      </span>
                      <span className="ml-auto text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-1">
                        {module.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Animal Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Basic Information
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">
                      Name or Label
                    </span>
                    <p className="text-lg font-medium mt-1">
                      {animalData.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">
                      Animal Type
                    </span>
                    <p className="text-lg font-medium mt-1">
                      {animalData.animalType}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">
                      Tag Number
                    </span>
                    <p className="text-lg font-medium mt-1">
                      {animalData.tagNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">
                      Location/Paddock
                    </span>
                    <p className="text-lg font-medium mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {animalData.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Physical Characteristics Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Scale className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Physical Characteristics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">Sex</span>
                      <span>{animalData.sex}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">Breed</span>
                      <span>{animalData.breed}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Coloring
                      </span>
                      <span>{animalData.coloring}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Weight
                      </span>
                      <span>{animalData.weight} kg (1.01 AU)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Height
                      </span>
                      <span>{animalData.height || "Add Height"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Retention Score
                      </span>
                      <span>{animalData.retentionScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Birth Information Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Baby className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Birth Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">Age</span>
                      <span>
                        {age?.totalDays} days ({age?.weeks} weeks old)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Birth Date
                      </span>
                      <span>
                        {format(animalData.birthDate!, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Siblings
                      </span>
                      <span>0 direct</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Birth Weight
                      </span>
                      <span>{animalData.birthWeight} kg</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    View Offspring
                  </Button>
                </div>
              </div>

              {/* Additional Information Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Info className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Additional Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Method Acquired
                      </span>
                      <span>{animalData.methodAcquired}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Estimated Value
                      </span>
                      <span>${animalData.estimatedValue}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-700">
                        Electronic ID
                      </span>
                      <span>{animalData.electronicId}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-semibold text-gray-700 block mb-2">
                      Description
                    </span>
                    <p className="text-gray-700">{animalData.description}</p>
                  </div>
                </div>
              </div>

              {/* Edit Animal Button at Bottom */}
              <div className="flex justify-end pt-6">
                <Button
                  onClick={() => setShowDisplay(false)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Edit Animal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form part remains exactly the same
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold">New Animal</h2>

      {/* Form content remains exactly the same as your original */}
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Name/Label</label>
            <Input
              placeholder="Enter name or label"
              value={animalData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Animal Type</label>
            <select
              className="border rounded p-2 w-full"
              value={animalData.animalType}
              onChange={(e) => handleInputChange("animalType", e.target.value)}
            >
              <option value="">Select Animal Type</option>
              <option>Cattle</option>
              <option>Goat</option>
              <option>Sheep</option>
              <option>Pig</option>
              <option>Chicken</option>
              <option>Duck</option>
              <option>Turkey</option>
              <option>Rabbit</option>
              <option>Horse</option>
              <option>Donkey</option>
              <option>Bee</option>
              <option>Fish</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Sex</label>
            <select
              className="border rounded p-2 w-full"
              value={animalData.sex}
              onChange={(e) => handleInputChange("sex", e.target.value)}
            >
              <option value="">Select Sex</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              Tag Number(s)
            </label>
            <Input
              placeholder="Enter tag number(s)"
              value={animalData.tagNumber}
              onChange={(e) => handleInputChange("tagNumber", e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold mb-1">Status</label>
            <select
              className="border rounded p-2 w-full"
              value={animalData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Butchered">Butchered</option>
              <option value="Culled">Culled</option>
              <option value="Deceased">Deceased</option>
              <option value="Dry">Dry</option>
              <option value="Finishing">Finishing</option>
              <option value="For Sale">For Sale</option>
              <option value="Lactating">Lactating</option>
              <option value="Lost">Lost</option>
              <option value="Off Farm">Off Farm</option>
              <option value="Quarantined">Quarantined</option>
              <option value="Reference">Reference</option>
              <option value="Sick">Sick</option>
              <option value="Sold">Sold</option>
              <option value="Weaning">Weaning</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-6" />

      {/* Physical Characteristics */}
      <div>
        <h3 className="text-lg font-medium mb-2">Physical Characteristics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Breed</label>
            <Input
              placeholder="Enter breed"
              value={animalData.breed}
              onChange={(e) => handleInputChange("breed", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Coloring</label>
            <Input
              placeholder="Enter coloring"
              value={animalData.coloring}
              onChange={(e) => handleInputChange("coloring", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Weight (kg)</label>
            <Input
              placeholder="Enter weight"
              value={animalData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Height (cm)</label>
            <Input
              placeholder="Enter height"
              value={animalData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">
              Retention Score
            </label>
            <Input
              placeholder="Enter retention score"
              value={animalData.retentionScore}
              onChange={(e) =>
                handleInputChange("retentionScore", e.target.value)
              }
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-bold mb-1">Description</label>
          <textarea
            placeholder="Enter description"
            className="border rounded p-2 w-full h-24"
            value={animalData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>

      <hr className="border-t border-gray-300 my-6" />

      {/* Birth Information */}
      <div>
        <h3 className="text-lg font-medium mb-2">Birth Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Birth Date</label>
            <DatePicker
              selected={animalData.birthDate}
              onChange={(date: Date | null) => {
                setAnimalData((prev) => ({ ...prev, birthDate: date }));
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              customInput={<CustomInput placeholder="dd/mm/yyyy" />}
              showPopperArrow={false}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              Birth Weight (kg)
            </label>
            <Input
              placeholder="Enter birth weight"
              value={animalData.birthWeight}
              onChange={(e) => handleInputChange("birthWeight", e.target.value)}
            />
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-6" />

      {/* Additional Information */}
      <div>
        <h3 className="text-lg font-medium mb-2">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">
              Method Acquired
            </label>
            <select
              className="border rounded p-2 w-full"
              value={animalData.methodAcquired}
              onChange={(e) =>
                handleInputChange("methodAcquired", e.target.value)
              }
            >
              <option value="raised on farm">Raised on Farm</option>
              <option value="purchased">Purchased</option>
              <option value="donated">Gifted/Donation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              Estimated Value ($)
            </label>
            <Input
              placeholder="Enter estimated value"
              value={animalData.estimatedValue}
              onChange={(e) =>
                handleInputChange("estimatedValue", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              Electronic ID (RFID)
            </label>
            <Input
              placeholder="Enter electronic ID"
              value={animalData.electronicId}
              onChange={(e) =>
                handleInputChange("electronicId", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          className="bg-green-600 text-white"
          onClick={handleCreate}
        >
          Create
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
};

export default AnimalForm;
