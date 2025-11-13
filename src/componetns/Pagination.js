import { useEffect, useState } from "react";

export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 10;
  useEffect(() => {
    const response = fetch("https://dummyjson.com/products?limit=500")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.products.length / productsPerPage));
      });

    // console.log(data.products)
  }, []);

  const indecOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indecOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indecOfLastProduct
  );

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <div>Products (page {currentPage})</div>
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {currentProducts.map((item) => (
          <div key={item.id}>
            <img src={item.thumbnail} alt="" style={{ width: "120px" }} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
