export const extractionResults = {
  "items": [
    {
      "paper_id": 10101,
      "pdf_path": "pdf/paper_10101_20250501_091010.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12345678"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT123456"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Smith, Dr. Johnson"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2024"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 3"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Multinational"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "36"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.75"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "200"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "150"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "350"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Government"
              }
            ]
          }
        }
      ]
    },
    {
      "paper_id": 10102,
      "pdf_path": "pdf/paper_10102_20250501_091020.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "98765432"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT987654"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Lee, Dr. Park"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2025"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 2"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "National"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.8"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "180"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "160"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "340"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Private"
              }
            ]
          }
        }
      ]
    },
    {
      "paper_id": 10101,
      "pdf_path": "pdf/paper_10101_20250501_091010.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12345678"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT123456"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Smith, Dr. Johnson"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2024"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 3"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Multinational"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "36"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.75"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "200"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "150"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "350"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Government"
              }
            ]
          }
        }
      ]
    },
    {
      "paper_id": 10102,
      "pdf_path": "pdf/paper_10102_20250501_091020.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "98765432"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT987654"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Lee, Dr. Park"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2025"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 2"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "National"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.8"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "180"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "160"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "340"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Private"
              }
            ]
          }
        }
      ]
    },
    {
      "paper_id": 10101,
      "pdf_path": "pdf/paper_10101_20250501_091010.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12345678"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT123456"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Smith, Dr. Johnson"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2024"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 3"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Multinational"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "36"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.75"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "200"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "150"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "350"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Government"
              }
            ]
          }
        }
      ]
    },
    {
      "paper_id": 10102,
      "pdf_path": "pdf/paper_10102_20250501_091020.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "98765432"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT987654"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Lee, Dr. Park"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2025"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 2"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "National"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.8"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "180"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "160"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "340"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Private"
              }
            ]
          }
        }
      ]
    },
    {
      "paper_id": 10101,
      "pdf_path": "pdf/paper_10101_20250501_091010.pdf",
      "extraction_results": [
        {
          "id": 1,
          "name": "Study Information",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 2,
          "name": "PMID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "12345678"
              }
            ]
          }
        },
        {
          "id": 3,
          "name": "NCT ID",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "NCT123456"
              }
            ]
          }
        },
        {
          "id": 4,
          "name": "Author(s)",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Dr. Smith, Dr. Johnson"
              }
            ]
          }
        },
        {
          "id": 5,
          "name": "Year of Publication",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "year",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "2024"
              }
            ]
          }
        },
        {
          "id": 6,
          "name": "Trial Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 7,
          "name": "Phase",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Phase 3"
              }
            ]
          }
        },
        {
          "id": 8,
          "name": "Origin",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Multinational"
              }
            ]
          }
        },
        {
          "id": 9,
          "name": "Follow-up Period (months)",
          "parent_id": 6,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "24"
              }
            ]
          }
        },
        {
          "id": 10,
          "name": "Population Characteristics",
          "parent_id": null,
          "is_parent": true,
          "level": 1,
          "field_type": null,
          "validation": null,
          "options": null,
          "extraction_result": null
        },
        {
          "id": 11,
          "name": "Median Survival (months)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "36"
              }
            ]
          }
        },
        {
          "id": 12,
          "name": "Hazard Ratio (HR)",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "0.75"
              }
            ]
          }
        },
        {
          "id": 13,
          "name": "Treatment Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "200"
              }
            ]
          }
        },
        {
          "id": 14,
          "name": "Control Group N",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "150"
              }
            ]
          }
        },
        {
          "id": 15,
          "name": "Total Participants",
          "parent_id": 10,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "number",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "350"
              }
            ]
          }
        },
        {
          "id": 16,
          "name": "Publication Status",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Published"
              }
            ]
          }
        },
        {
          "id": 17,
          "name": "Funding Source",
          "parent_id": 1,
          "is_parent": false,
          "level": 2,
          "field_type": "text box",
          "validation": "alpha-numeric",
          "options": null,
          "extraction_result": {
            "result": [
              {
                "value": "Government"
              }
            ]
          }
        }
      ]
    },
  ]
}

