import type { PortableTextBlock } from 'next-sanity';

type SanitySlug = {
	readonly _type: 'slug';
	readonly current: string;
};

type SanityImageAssetRef = {
	readonly _type: 'reference';
	readonly _ref: string;
};

export type StockAnalysisImage = {
	readonly _type: 'image';
	readonly asset: SanityImageAssetRef;
	readonly alt?: string;
};

export type StockAnalysisBodyBlock = PortableTextBlock | StockAnalysisImage;

export type StockAnalysisPost = {
	readonly _id: string;
	readonly _type: 'stock-analysis-post';
	readonly title: string;
	readonly slug: SanitySlug;
	readonly publishedAt: string;
	readonly body?: StockAnalysisBodyBlock[];
	readonly type: string;
  readonly image?: StockAnalysisImage;
	readonly recommended: boolean;
};