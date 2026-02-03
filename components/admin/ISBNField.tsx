"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { useField, useFormFields, FieldLabel } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import type { BookLookupResponse, BookSearchResult } from "@/app/api/books/lookup/route";

import "./ISBNField.scss";

export const ISBNField: TextFieldClientComponent = (props) => {
  const { path, field } = props;
  const { value, setValue } = useField<string>({ path });

  // ISBN Lookup State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
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
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchBooks = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    setSearchResults([]); // clear previous results while searching

    try {
      const response = await fetch(`/api/books/lookup?query=${encodeURIComponent(query)}`);
      const data: BookLookupResponse = await response.json();

      if (data.success && data.results) {
        setSearchResults(data.results);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Book search error:", err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchQuery(newVal);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchBooks(newVal);
    }, 400);
  };

  const handleSelectResult = async (result: BookSearchResult) => {
    setShowDropdown(false);

    // If we have an ISBN, set it and trigger the main lookup
    if (result.isbn) {
      setValue(result.isbn);
      setSearchQuery(""); // clear search

      // Trigger lookup
      await handleLookup(result.isbn);
    } else {
      // If no ISBN, we can still populate available data
      if (result.title) dispatchFields({ type: "UPDATE", path: "title", value: result.title });
      if (result.author) dispatchFields({ type: "UPDATE", path: "author", value: result.author });

      // Handle Cover if available
      if (result.coverId) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${result.coverId}-L.jpg`;
        dispatchFields({ type: "UPDATE", path: "imageUrl", value: coverUrl });
      }

      setSuccess(`Selected: "${result.title}" (No ISBN found)`);
    }
  };

  const handleLookup = useCallback(
    async (isbnToLookup: string) => {
      if (!isbnToLookup || isbnToLookup.length < 10) return;

      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch(`/api/books/lookup?isbn=${encodeURIComponent(isbnToLookup)}`);
        const result: BookLookupResponse = await response.json();

        if (!result.success || !result.data) {
          setError(result.error || "Failed to lookup ISBN");
          return;
        }

        const { title, author, description, imageUrl } = result.data;

        // Update form fields using dispatch
        if (title) dispatchFields({ type: "UPDATE", path: "title", value: title });
        if (author) dispatchFields({ type: "UPDATE", path: "author", value: author });
        if (imageUrl) dispatchFields({ type: "UPDATE", path: "imageUrl", value: imageUrl });
        if (description) dispatchFields({ type: "UPDATE", path: "description", value: description });

        setSuccess(`Found: "${title}" by ${author || "Unknown"}`);
      } catch (err) {
        console.error("ISBN lookup error:", err);
        setError("Failed to lookup book. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatchFields],
  );

  const handleBlur = useCallback(() => {
    if (value) handleLookup(value);
  }, [value, handleLookup]);

  return (
    <div className="isbn-field-wrapper field-type text">
      <FieldLabel label={field.label} path={path} required={field.required} />

      {/* Search Input Area */}
      <div className="isbn-search-container" style={{ marginBottom: "1rem", position: "relative" }}>
        <div className="search-input-wrapper">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by book title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (searchResults.length > 0) setShowDropdown(true);
            }}
            className="isbn-field-input search-input"
            style={{ width: "100%" }}
          />
          {isSearching && (
            <span
              className="search-spinner"
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
            >
              ↻
            </span>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <div
            ref={dropdownRef}
            className="search-results-dropdown"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 100,
              background: "var(--theme-elevation-100)",
              border: "1px solid var(--theme-elevation-200)",
              borderRadius: "4px",
              maxHeight: "300px",
              overflowY: "auto",
              marginTop: "4px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {searchResults.map((result, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectResult(result)}
                className="search-result-item"
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderBottom: "1px solid var(--theme-elevation-200)",
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  gap: "10px",
                }}
              >
                {result.coverId ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${result.coverId}-S.jpg`}
                    alt="cover"
                    style={{ width: "40px", height: "60px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "40px",
                      height: "60px",
                      background: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                    }}
                  >
                    No Cover
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: "bold" }}>{result.title}</div>
                  <div style={{ fontSize: "0.85em", opacity: 0.8 }}>{result.author}</div>
                  <div style={{ fontSize: "0.8em", opacity: 0.6 }}>
                    {result.year} {result.isbn ? `• ISBN: ${result.isbn}` : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="field-description" style={{ marginBottom: "0.5rem" }}>
        Or enter ISBN directly:
      </div>

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
