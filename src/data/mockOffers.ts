
export const mockOffers = [
  {
    id: "1",
    title: "25% OFF on All Desserts",
    description: "Enjoy sweet treats at a special price this weekend!",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop",
    backgroundColor: "#fdf2f8"
  },
  {
    id: "2",
    title: "Happy Hours: Buy 1 Get 1 Free",
    description: "On all beverages from 4pm to 7pm",
    imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop",
    backgroundColor: "#eff6ff"
  },
  {
    id: "3",
    title: "New Items on the Menu",
    description: "Try our chef's special seasonal dishes",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop",
    backgroundColor: "#f0fdf4"
  }
];

export type Offer = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
};
