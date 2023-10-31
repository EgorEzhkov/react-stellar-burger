export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id: string;
  readonly uniqueId?: string;
};

export type TOrder = {
  readonly createdAt: string;
  ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
};
