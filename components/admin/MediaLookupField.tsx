"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { useField, useFormFields, FieldLabel } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import type { MediaSearchResponse, MediaSearchResult, MediaDetailResponse } from "@/app/api/media/lookup/route";

import "./MediaLookupField.scss";

export const MediaLookupField: TextFieldClientComponent = (props) => {
  const { path, field } = props;
  const { value, setValue } = useField<string>({ path });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [results, setResults] = useState<MediaSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Get dispatch functions for other fields
  const dispatchFields = useFormFields(([_fields, dispatch]) => dispatch);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchMedia = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/media/lookup?query=${encodeURIComponent(query)}`);
      const data: MediaSearchResponse = await response.json();

      if (!data.success) {
        setError(data.error || "Search failed");
        setResults([]);
      } else {
        setResults(data.results || []);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Media search error:", err);
      setError("Failed to search. Please try again.");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setError(null);
      setSuccess(null);

      // Debounce the search
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        searchMedia(newValue);
      }, 300);
    },
    [setValue, searchMedia]
  );

  const handleSelectResult = useCallback(
    async (result: MediaSearchResult) => {
      setShowDropdown(false);
      setIsLoading(true);
      setError(null);
      setValue(result.title);

      try {
        const typeParam = result.type === "Movie" ? "movie" : "tv";
        const response = await fetch(`/api/media/lookup?id=${result.id}&type=${typeParam}`);
        const data: MediaDetailResponse = await response.json();

        if (!data.success || !data.data) {
          setError(data.error || "Failed to fetch details");
          return;
        }

        const { title, description, imageUrl, type, genres } = data.data;

        // Update form fields using dispatch
        if (title) {
          dispatchFields({ type: "UPDATE", path: "title", value: title });
        }

        if (type) {
          dispatchFields({ type: "UPDATE", path: "type", value: type });
        }

        if (imageUrl) {
          dispatchFields({ type: "UPDATE", path: "imageUrl", value: imageUrl });
        }

        if (description) {
          dispatchFields({ type: "UPDATE", path: "description", value: description });
        }

        // Convert genres to tags array format
        if (genres && genres.length > 0) {
          dispatchFields({
            type: "UPDATE",
            path: "tags",
            value: genres.map((genre) => ({ tag: genre })),
          });
        }

        setSuccess(`Found: "${title}" (${type})`);
        setResults([]);
      } catch (err) {
        console.error("Media details fetch error:", err);
        setError("Failed to fetch details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [setValue, dispatchFields]
  );

  const handleFocus = useCallback(() => {
    if (results.length > 0) {
      setShowDropdown(true);
    }
  }, [results.length]);

  return (
    <div className="media-lookup-wrapper field-type text">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className="media-lookup-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          id={`field-${path}`}
          name={path}
          value={value || ""}
          onChange={handleInputChange}
          onFocus={handleFocus}
          disabled={isLoading}
          placeholder="Search for a movie or TV show..."
          className="media-lookup-input"
          autoComplete="off"
        />
        {isSearching && <span className="media-lookup-input-spinner" />}
      </div>

      {showDropdown && results.length > 0 && (
        <div ref={dropdownRef} className="media-lookup-dropdown">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              type="button"
              className="media-lookup-result"
              onClick={() => handleSelectResult(result)}
            >
              <div className="media-lookup-result-poster">
                {result.posterUrl ? (
                  <img src={result.posterUrl} alt={result.title} />
                ) : (
                  <div className="media-lookup-result-no-poster">No Image</div>
                )}
              </div>
              <div className="media-lookup-result-info">
                <div className="media-lookup-result-title">{result.title}</div>
                <div className="media-lookup-result-meta">
                  <span className="media-lookup-result-type">{result.type}</span>
                  {result.releaseYear && <span className="media-lookup-result-year">{result.releaseYear}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {!isLoading && !isSearching && !error && !success && field.admin?.description && (
        <div className="field-description">{field.admin.description as string}</div>
      )}
      {isLoading && (
        <div className="media-lookup-loading">
          <span className="media-lookup-spinner" />
          <span>Fetching media details...</span>
        </div>
      )}
      {error && <div className="media-lookup-error">{error}</div>}
      {success && <div className="media-lookup-success">{success}</div>}
    </div>
  );
};

export default MediaLookupField;
