
export interface ExtractionResultValue {
    value: string | number | boolean;
  }
  
 export interface ExtractionResult {
    result: ExtractionResultValue[];
  }
  
  export interface ExtractionNode {
    id: number;
    name: string;
    parent_id: number | null;
    is_parent: boolean;
    level: number;
    field_type: string | null;
    validation: string | null;
    options: string[] | null;
    isExpand?: Boolean,
    extraction_result: ExtractionResult | null;
    children?: ExtractionNode[];
  }
 export interface Item {
    paper_id: number;
    pdf_path: string | null;
    extraction_results: ExtractionNode[];
  }
  