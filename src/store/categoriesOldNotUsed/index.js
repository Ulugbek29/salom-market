import { create } from "zustand";
import { persist } from "zustand/middleware";



const useProductsStore = create(
  persist(
    (set, get) => ({
      products: [],
      persistProducts: [],
      activeCategory: {},
      addToCard: (id, key) => {
        const updated = get().products.map((i) =>
        i.id === id ? { ...i, count: i.count >= 0 ? i.count + (key === "plus" ? 1 : -1) : 0 } : i
      );

       

        return set({
          products: updated,
          persistProducts: updated,
        });
      },
      // setProductsAsync: async () => {
      //   const res = await productsService.getList()
      //   .then((res)=> console.log(res))
      //   const data = await res.json()

      //   console.log(res)
      //   set({
      //     products: data,
      //   });
      // },
      setProducts: (arr) =>
        set({
          products: arr,
        }),
      setPersistProducts: (arr) =>
        set({
          persistProducts: arr,
        }),
      setActiveCategory: (obj) => {
        set({
          activeCategory: obj,
        });
      },
    }),
    { name: "products-storage" }
  )
);

export default useProductsStore;
