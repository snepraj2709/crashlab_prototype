export interface PortableTextSpan {
  _type: "span";
  text: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "blockquote";
  children: PortableTextSpan[];
}

export interface ImageAsset {
  url: string;
  alt: string;
}
