import dalPhotoSrc from "~/assets/images/recipes/dal.png";
import risottoPhotoSrc from "~/assets/images/recipes/risotto.png";
import sheetpanPhotoSrc from "~/assets/images/recipes/sheetpan.png";
import skewersPhotoSrc from "~/assets/images/recipes/skewers.png";
import tacosPhotoSrc from "~/assets/images/recipes/tacos.png";
import type { Recipe, RecipeAuthor, RecipeTagCategory, ScannedRecipe } from "~/core/recipes/RecipeTypes";

/**
 * Placeholder content for the recipe views.
 *
 * The app has no recipe service yet, so routes and stories both read from here.
 * Replacing it with a loader is a one-line change in each route hook.
 */

/** Tags offered as chips before the cook opens the full community catalogue. */
export const SuggestedTags = ["vegetarian", "meat", "fish", "bbq", "quick", "cheap", "expensive", "comfort"];

export const SampleAuthorMe: RecipeAuthor = {
  id: "me",
  name: "Petter",
  handle: "@petter",
  avatarUrl: null,
  color: "oklch(0.62 0.195 253.8)",
};

export const SampleAuthorNina: RecipeAuthor = {
  id: "nina",
  name: "Nina Farrow",
  handle: "@ninacooks",
  avatarUrl: null,
  color: "oklch(0.60 0.14 155)",
};

export const SampleAuthorOmar: RecipeAuthor = {
  id: "omar",
  name: "Omar Haddad",
  handle: "@omarh",
  avatarUrl: null,
  color: "oklch(0.60 0.20 25)",
};

export const SampleRecipes: Recipe[] = [
  {
    id: "r1",
    title: "Red lentil dal",
    tags: ["vegetarian", "cheap", "quick"],
    servings: 4,
    timeMinutes: 30,
    photoUrl: dalPhotoSrc,
    author: SampleAuthorMe,
    isSaved: true,
    ingredients: [
      { quantity: 300, unit: "g", item: "Red lentils" },
      { quantity: 1, unit: "tin", item: "Chopped tomatoes" },
      { quantity: 2, unit: "tbsp", item: "Curry powder" },
      { quantity: 1, unit: "", item: "Onion" },
      { quantity: 400, unit: "ml", item: "Coconut milk" },
    ],
    steps: [
      "Soften the onion in oil for five minutes.",
      "Add curry powder, then lentils, tomatoes and coconut milk.",
      "Simmer 20 minutes until the lentils collapse.",
      "Season and serve with rice or flatbread.",
    ],
  },
  {
    id: "r2",
    title: "Lamb skewers on the grill",
    tags: ["meat", "bbq", "expensive"],
    servings: 4,
    timeMinutes: 45,
    photoUrl: skewersPhotoSrc,
    author: SampleAuthorMe,
    isSaved: true,
    ingredients: [
      { quantity: 800, unit: "g", item: "Lamb shoulder, cubed" },
      { quantity: 3, unit: "cloves", item: "Garlic" },
      { quantity: 2, unit: "tbsp", item: "Olive oil" },
      { quantity: 1, unit: "tsp", item: "Ground cumin" },
      { quantity: 2, unit: "", item: "Red onion" },
    ],
    steps: [
      "Mix oil, crushed garlic and cumin, coat the lamb and rest 30 minutes.",
      "Thread onto skewers with wedges of red onion.",
      "Grill over direct heat, turning every two minutes.",
      "Rest five minutes before serving.",
    ],
  },
  {
    id: "r3",
    title: "Mushroom risotto",
    tags: ["vegetarian", "comfort"],
    servings: 4,
    timeMinutes: 40,
    photoUrl: risottoPhotoSrc,
    author: SampleAuthorMe,
    isSaved: true,
    ingredients: [
      { quantity: 320, unit: "g", item: "Arborio rice" },
      { quantity: 400, unit: "g", item: "Mixed mushrooms" },
      { quantity: 1.2, unit: "l", item: "Vegetable stock" },
      { quantity: 60, unit: "g", item: "Parmesan" },
      { quantity: 40, unit: "g", item: "Butter" },
    ],
    steps: [
      "Fry the mushrooms hard in batches, set aside.",
      "Toast the rice in butter, then add stock a ladle at a time.",
      "After 18 minutes fold the mushrooms back in.",
      "Finish off the heat with butter and parmesan.",
    ],
  },
  {
    id: "r4",
    title: "Sheet-pan chicken and root veg",
    tags: ["meat", "cheap", "sheet-pan"],
    servings: 4,
    timeMinutes: 55,
    photoUrl: sheetpanPhotoSrc,
    author: SampleAuthorMe,
    isSaved: true,
    ingredients: [
      { quantity: 8, unit: "", item: "Chicken thighs" },
      { quantity: 600, unit: "g", item: "Carrots and parsnips" },
      { quantity: 2, unit: "tbsp", item: "Olive oil" },
      { quantity: 1, unit: "tbsp", item: "Dried thyme" },
      { quantity: 1, unit: "", item: "Lemon" },
    ],
    steps: [
      "Heat the oven to 220C.",
      "Toss the veg in oil and thyme, spread on a tray.",
      "Sit the chicken on top, skin up, and roast 45 minutes.",
      "Squeeze over lemon before serving.",
    ],
  },
  {
    id: "r5",
    title: "Salmon tacos",
    tags: ["fish", "quick"],
    servings: 4,
    timeMinutes: 25,
    photoUrl: tacosPhotoSrc,
    author: SampleAuthorMe,
    isSaved: true,
    ingredients: [
      { quantity: 600, unit: "g", item: "Salmon fillet" },
      { quantity: 8, unit: "", item: "Small tortillas" },
      { quantity: 200, unit: "g", item: "White cabbage" },
      { quantity: 150, unit: "g", item: "Yoghurt" },
      { quantity: 1, unit: "", item: "Lime" },
    ],
    steps: [
      "Rub the salmon with paprika and roast 12 minutes.",
      "Shred the cabbage and dress with lime.",
      "Stir lime zest through the yoghurt.",
      "Flake the fish into warm tortillas and pile on the slaw.",
    ],
  },
  {
    id: "r6",
    title: "Halloumi and chickpea salad",
    tags: ["vegetarian", "quick"],
    servings: 2,
    timeMinutes: 20,
    photoUrl: null,
    author: SampleAuthorMe,
    isSaved: true,
    ingredients: [
      { quantity: 250, unit: "g", item: "Halloumi" },
      { quantity: 1, unit: "tin", item: "Chickpeas" },
      { quantity: 150, unit: "g", item: "Cherry tomatoes" },
      { quantity: 2, unit: "tbsp", item: "Olive oil" },
      { quantity: 1, unit: "handful", item: "Mint" },
    ],
    steps: [
      "Fry thick slices of halloumi until deeply golden.",
      "Warm the chickpeas with oil and halved tomatoes.",
      "Combine, tear over mint and finish with lemon.",
    ],
  },
  {
    id: "c1",
    title: "Miso butter noodles",
    tags: ["vegetarian", "quick", "comfort"],
    servings: 2,
    timeMinutes: 15,
    photoUrl: null,
    author: SampleAuthorNina,
    isSaved: false,
    ingredients: [
      { quantity: 200, unit: "g", item: "Udon noodles" },
      { quantity: 2, unit: "tbsp", item: "White miso" },
      { quantity: 40, unit: "g", item: "Butter" },
      { quantity: 2, unit: "", item: "Spring onions" },
      { quantity: null, unit: "", item: "Toasted sesame" },
    ],
    steps: [
      "Boil the noodles and keep a cup of the water.",
      "Melt the butter with the miso and a splash of noodle water.",
      "Toss the noodles through until glossy.",
      "Finish with spring onion and sesame.",
    ],
  },
  {
    id: "c2",
    title: "Slow-cooked beef shin ragu",
    tags: ["meat", "beef", "comfort", "batch-cook"],
    servings: 6,
    timeMinutes: 210,
    photoUrl: null,
    author: SampleAuthorOmar,
    isSaved: false,
    ingredients: [
      { quantity: 1.2, unit: "kg", item: "Beef shin" },
      { quantity: 2, unit: "tins", item: "Chopped tomatoes" },
      { quantity: 250, unit: "ml", item: "Red wine" },
      { quantity: 2, unit: "", item: "Carrots" },
      { quantity: 1, unit: "", item: "Celery stick" },
    ],
    steps: [
      "Brown the shin hard on every side, then set aside.",
      "Soften the carrot and celery, deglaze with the wine.",
      "Return the meat with the tomatoes and cook at 150C for three hours.",
      "Shred, season, and fold through pappardelle.",
    ],
  },
  {
    id: "c3",
    title: "Charred broccoli with tahini",
    tags: ["vegan", "quick", "light"],
    servings: 4,
    timeMinutes: 20,
    photoUrl: null,
    author: SampleAuthorNina,
    isSaved: false,
    ingredients: [
      { quantity: 600, unit: "g", item: "Tenderstem broccoli" },
      { quantity: 3, unit: "tbsp", item: "Tahini" },
      { quantity: 1, unit: "", item: "Lemon" },
      { quantity: 1, unit: "clove", item: "Garlic" },
      { quantity: null, unit: "", item: "Chilli flakes" },
    ],
    steps: [
      "Blister the broccoli in a dry pan until charred in places.",
      "Loosen the tahini with lemon juice, water and grated garlic.",
      "Spoon the dressing over and scatter with chilli.",
    ],
  },
];

/** The community tag catalogue offered by the "browse all tags" dialog. */
export const SampleTagCatalogue: RecipeTagCategory[] = [
  {
    group: "Diet",
    tags: [
      { name: "vegetarian", count: 2840 },
      { name: "vegan", count: 1310 },
      { name: "pescatarian", count: 420 },
      { name: "gluten-free", count: 760 },
      { name: "dairy-free", count: 530 },
      { name: "low-carb", count: 690 },
      { name: "high-protein", count: 980 },
    ],
  },
  {
    group: "Main ingredient",
    tags: [
      { name: "meat", count: 3100 },
      { name: "chicken", count: 2450 },
      { name: "beef", count: 1180 },
      { name: "pork", count: 860 },
      { name: "fish", count: 1520 },
      { name: "seafood", count: 640 },
      { name: "pasta", count: 1970 },
      { name: "rice", count: 1240 },
      { name: "beans", count: 580 },
      { name: "eggs", count: 700 },
    ],
  },
  {
    group: "Method",
    tags: [
      { name: "bbq", count: 1120 },
      { name: "oven", count: 1460 },
      { name: "one-pot", count: 1340 },
      { name: "sheet-pan", count: 720 },
      { name: "slow-cooker", count: 480 },
      { name: "air-fryer", count: 610 },
      { name: "no-cook", count: 250 },
    ],
  },
  {
    group: "Effort and cost",
    tags: [
      { name: "quick", count: 3600 },
      { name: "cheap", count: 2900 },
      { name: "expensive", count: 340 },
      { name: "batch-cook", count: 890 },
      { name: "freezer-friendly", count: 760 },
      { name: "leftovers", count: 540 },
      { name: "five-ingredient", count: 620 },
    ],
  },
  {
    group: "Mood",
    tags: [
      { name: "comfort", count: 2100 },
      { name: "light", count: 940 },
      { name: "spicy", count: 1280 },
      { name: "kid-friendly", count: 1560 },
      { name: "date-night", count: 380 },
      { name: "weeknight", count: 2700 },
      { name: "weekend", count: 610 },
    ],
  },
  {
    group: "Cuisine",
    tags: [
      { name: "italian", count: 1890 },
      { name: "mexican", count: 1420 },
      { name: "indian", count: 1350 },
      { name: "thai", count: 810 },
      { name: "japanese", count: 760 },
      { name: "nordic", count: 290 },
      { name: "middle-eastern", count: 680 },
    ],
  },
];

/** What a photo scan comes back with, used to demo the scan dialog. */
export const SampleScannedRecipe: ScannedRecipe = {
  title: "Tomato and bread soup",
  tags: ["vegetarian", "cheap", "comfort"],
  servings: 4,
  timeMinutes: 35,
  photoUrl: null,
  ingredients: [
    { quantity: 800, unit: "g", item: "Ripe tomatoes" },
    { quantity: 250, unit: "g", item: "Stale sourdough" },
    { quantity: 3, unit: "cloves", item: "Garlic" },
    { quantity: 4, unit: "tbsp", item: "Olive oil" },
    { quantity: 1, unit: "handful", item: "Basil" },
  ],
  steps: [
    "Warm the garlic in the oil until fragrant, not coloured.",
    "Add the tomatoes and cook down for fifteen minutes.",
    "Tear in the bread and stir until it collapses into the sauce.",
    "Rest off the heat, then finish with basil and more oil.",
  ],
};
