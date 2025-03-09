"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Checkpoint {
  title: string;
  description: string;
  percentage: number;
}

interface CreateCheckpointsProps {
  checkpoints: Checkpoint[];
  onChange: (checkpoints: Checkpoint[]) => void;
}

export default function CreateCheckpoints({
  checkpoints,
  onChange,
}: CreateCheckpointsProps) {
  const [error, setError] = useState<string | null>(null);

  const addCheckpoint = () => {
    const newCheckpoints = [
      ...checkpoints,
      { title: "", description: "", percentage: 0 },
    ];

    // Recalculate percentages to distribute evenly
    const percentage = Math.floor(100 / newCheckpoints.length);
    const remainder = 100 - percentage * newCheckpoints.length;

    newCheckpoints.forEach((checkpoint, index) => {
      checkpoint.percentage = percentage + (index === 0 ? remainder : 0);
    });

    onChange(newCheckpoints);
    setError(null);
  };

  const removeCheckpoint = (index: number) => {
    if (checkpoints.length <= 1) {
      setError("You must have at least one checkpoint");
      return;
    }

    const newCheckpoints = checkpoints.filter((_, i) => i !== index);

    // Recalculate percentages to distribute evenly
    const percentage = Math.floor(100 / newCheckpoints.length);
    const remainder = 100 - percentage * newCheckpoints.length;

    newCheckpoints.forEach((checkpoint, index) => {
      checkpoint.percentage = percentage + (index === 0 ? remainder : 0);
    });

    onChange(newCheckpoints);
    setError(null);
  };

  const updateCheckpoint = (
    index: number,
    field: keyof Checkpoint,
    value: string | number
  ) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[index] = { ...newCheckpoints[index], [field]: value };

    if (field === "percentage") {
      // Ensure percentages add up to 100%
      const total = newCheckpoints.reduce((sum, cp) => sum + cp.percentage, 0);

      if (total !== 100) {
        setError(`Percentages must add up to 100%. Current total: ${total}%`);
      } else {
        setError(null);
      }
    }

    onChange(newCheckpoints);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {checkpoints.map((checkpoint, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Checkpoint {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCheckpoint(index)}
                className="h-8 px-2 text-muted-foreground"
              >
                Remove
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor={`checkpoint-${index}-title`}>Title</Label>
                <Input
                  id={`checkpoint-${index}-title`}
                  value={checkpoint.title}
                  onChange={(e) =>
                    updateCheckpoint(index, "title", e.target.value)
                  }
                  placeholder="e.g., Equipment Purchase"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`checkpoint-${index}-description`}>
                  Description
                </Label>
                <Textarea
                  id={`checkpoint-${index}-description`}
                  value={checkpoint.description}
                  onChange={(e) =>
                    updateCheckpoint(index, "description", e.target.value)
                  }
                  placeholder="Describe what will be accomplished at this checkpoint"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`checkpoint-${index}-percentage`}>
                  Percentage of Total Funding (%)
                </Label>
                <Input
                  id={`checkpoint-${index}-percentage`}
                  type="number"
                  min="1"
                  max="100"
                  value={checkpoint.percentage}
                  onChange={(e) =>
                    updateCheckpoint(
                      index,
                      "percentage",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addCheckpoint}
        className="w-full"
      >
        Add Another Checkpoint
      </Button>

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-blue-700 mb-2">Checkpoint Tips</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-600">
          <li>
            Break your project into logical stages that donors can easily
            understand
          </li>
          <li>Each checkpoint should have a clear, measurable outcome</li>
          <li>
            Allocate funding percentages based on the resources needed at each
            stage
          </li>
          <li>
            You&apos;ll need to provide proof of completion for each checkpoint
            to receive funds
          </li>
        </ul>
      </div>
    </div>
  );
}
