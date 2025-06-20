"use client";

import { useState } from "react";
import { Plus, X, Clock, Coffee, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type AvailabilityType = "study" | "break";

interface TimeBlock {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  type: AvailabilityType;
  label?: string;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

const AVAILABILITY_TYPES = {
  study: {
    color: "bg-green-100 border-green-300 text-green-800",
    icon: BookOpen,
    label: "Study Time",
  },
  break: {
    color: "bg-red-100 border-red-300 text-red-800",
    icon: Coffee,
    label: "Break/DND",
  },
};

export default function Availability() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [newBlock, setNewBlock] = useState({
    day: "",
    startTime: "",
    endTime: "",
    type: "study" as AvailabilityType,
    label: "",
  });

  // console.log(timeBlocks); // send to server

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addTimeBlock = () => {
    if (newBlock.day && newBlock.startTime && newBlock.endTime) {
      const block: TimeBlock = {
        id: Date.now().toString(),
        ...newBlock,
      };
      setTimeBlocks((prev) => [...prev, block]);
      setNewBlock({
        day: "",
        startTime: "",
        endTime: "",
        type: "study",
        label: "",
      });
    }
  };

  const removeTimeBlock = (id: string) => {
    setTimeBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const getBlocksForDay = (day: string) => {
    return timeBlocks.filter((block) => block.day === day);
  };

  return (
    <div className="mx-auto py-7 space-y-6">
      <div className=" mt-10">
        <h1 className="text-xl font-bold mb-5">Availability Preferences</h1>
        <p className="text-muted-foreground">
          Set your preferred study times, breaks, and flexible hours
        </p>
      </div>

      {/* Days Selection */}
      <Card className=" border border-[#4F46E5] shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Days
          </CardTitle>
          <CardDescription>
            Select the days you want to schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={selectedDays.includes(day)}
                  onCheckedChange={() => handleDayToggle(day)}
                />
                <Label htmlFor={day} className="text-sm font-medium">
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Time Block */}
      <Card className=" border border-[#4F46E5] shadow-lg">
        <CardHeader>
          <CardTitle>Add Time Block</CardTitle>
          <CardDescription>
            Create a new study session, break, or flexible time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className=" space-y-3">
              <Label htmlFor="day">Day</Label>
              <Select
                value={newBlock.day}
                onValueChange={(value) =>
                  setNewBlock((prev) => ({ ...prev, day: value }))
                }
              >
                <SelectTrigger className=" border border-[#4F46E5] shadow-lg cursor-pointer">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className=" text-white bg-[#4F46E5] shadow-lg">
                  {selectedDays.map((day) => (
                    <SelectItem
                      key={day}
                      value={day}
                      className=" hover:bg-white hover:text-[#4F46E5] cursor-pointer"
                    >
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className=" space-y-3">
              <Label htmlFor="startTime">Start Time</Label>
              <Select
                value={newBlock.startTime}
                onValueChange={(value) =>
                  setNewBlock((prev) => ({ ...prev, startTime: value }))
                }
              >
                <SelectTrigger className=" border border-[#4F46E5] shadow-lg cursor-pointer">
                  <SelectValue placeholder="Start" />
                </SelectTrigger>
                <SelectContent className=" text-white bg-[#4F46E5] shadow-lg">
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className=" hover:bg-white hover:text-[#4F46E5] cursor-pointer"
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className=" space-y-3">
              <Label htmlFor="endTime">End Time</Label>
              <Select
                value={newBlock.endTime}
                onValueChange={(value) =>
                  setNewBlock((prev) => ({ ...prev, endTime: value }))
                }
              >
                <SelectTrigger className=" border border-[#4F46E5] shadow-lg cursor-pointer">
                  <SelectValue placeholder="End" />
                </SelectTrigger>
                <SelectContent className=" text-white bg-[#4F46E5] shadow-lg">
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className=" hover:bg-white hover:text-[#4F46E5]  cursor-pointer"
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className=" space-y-3">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newBlock.type}
                onValueChange={(value: AvailabilityType) =>
                  setNewBlock((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className=" border border-[#4F46E5] shadow-lg cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className=" text-white bg-[#4F46E5] shadow-lg">
                  {Object.entries(AVAILABILITY_TYPES).map(([key, config]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className=" hover:bg-white hover:text-[#4F46E5] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <config.icon className="h-4 w-4" />
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className=" space-y-3 ms-2">
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                className="focus:outline-none focus:ring-0 focus:ring-[#4F46E5] focus:border-[#4F46E5] focus:border-0 border border-[#4F46E5]"
                placeholder="e.g. Morning Study"
                value={newBlock.label}
                onChange={(e) =>
                  setNewBlock((prev) => ({ ...prev, label: e.target.value }))
                }
              />
            </div>
          </div>

          <Button
            onClick={addTimeBlock}
            className="w-full md:w-auto bg-[#4F46E5] text-white cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time Block
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card className=" border border-[#4F46E5] shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>
            Your availability preferences for each day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {selectedDays.length > 0 ? (
              selectedDays.map((day) => (
                <div key={day} className="space-y-3">
                  <h3 className="font-semibold text-lg">{day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {getBlocksForDay(day).length > 0 ? (
                      getBlocksForDay(day).map((block) => {
                        const config = AVAILABILITY_TYPES[block.type];
                        const Icon = config.icon;
                        return (
                          <Badge
                            key={block.id}
                            variant="outline"
                            className={`${config.color} px-3 py-2 text-sm flex items-center gap-2`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>
                              {block.startTime} - {block.endTime}
                              {block.label && ` (${block.label})`}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                              onClick={() => removeTimeBlock(block.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No time blocks scheduled
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">
                No days selected
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className=" border border-[#4F46E5] shadow-lg">
        <CardHeader>
          <CardTitle>Color Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(AVAILABILITY_TYPES).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border-2 ${config.color}`} />
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{config.label}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
