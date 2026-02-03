"use client";

import React, { useCallback, useState } from "react";
import { TextInput, useField, useFormFields, FieldLabel } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import type { BookLookupResponse } from "@/app/api/books/lookup/route";

import "./ISBNField.scss";

export const ISBNField: TextFieldClientComponent = (props) => {
  const { path, field } = props;
  const { value, setValue } = useField<string>({ path });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get dispatch functions for other fields
  const dispatchFields = useFormFields(([fields, dispatch]) => dispatch);

  const handleBlur = useCallback(async () => {
    // Don't fetch if no ISBN or if it's too short
    if (!value || value.length < 10) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/books/lookup?isbn=${encodeURIComponent(value)}`);
      const result: BookLookupResponse = await response.json();

      if (!result.success || !result.data) {
        setError(result.error || "Failed to lookup ISBN");
        return;
      }

      const { title, author, description, imageUrl } = result.data;

      // Update form fields using dispatch
      if (title) {
        dispatchFields({
          type: "UPDATE",
          path: "title",
          value: title,
        });
      }

      if (author) {
        dispatchFields({
          type: "UPDATE",
          path: "author",
          value: author,
        });
      }

      if (imageUrl) {
        dispatchFields({
          type: "UPDATE",
          path: "imageUrl",
          value: imageUrl,
        });
      }

      if (description) {
        // Create a Lexical rich text structure for the description
        dispatchFields({
          type: "UPDATE",
          path: "description",
          value: {
            root: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: description }],
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        });
      }

      setSuccess(`Found: "${title}" by ${author || "Unknown"}`);
    } catch (err) {
      console.error("ISBN lookup error:", err);
      setError("Failed to lookup book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [value, dispatchFields]);

  return (
    <div className="isbn-field-wrapper field-type text">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className="isbn-field-input-wrapper">
        <input
          type="text"
          id={`field-${path}`}
          name={path}
          value={value || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            setError(null);
            setSuccess(null);
          }}
          onBlur={handleBlur}
          disabled={isLoading}
          className="isbn-field-input"
        />
      </div>
      {!isLoading && !error && !success && field.admin?.description && (
        <div className="field-description">{field.admin.description as string}</div>
      )}
      {isLoading && (
        <div className="isbn-field-loading">
          <span className="isbn-field-spinner" />
          <span>Looking up book details...</span>
        </div>
      )}
      {error && <div className="isbn-field-error">{error}</div>}
      {success && <div className="isbn-field-success">{success}</div>}
    </div>
  );
};

export default ISBNField;
