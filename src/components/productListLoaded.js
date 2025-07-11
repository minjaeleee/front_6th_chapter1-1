import { limitSelector } from "./limitSelector";
import { productCard } from "./productCard";

export const productListLoaded = (
  products,
  limit,
  searchTerm = "",
  categories = {},
  selectedCategories = {},
  totalProducts = 0,
) => {
  const generateBreadcrumb = (selectedCategories) => {
    const breadcrumbs = ["전체"];
    if (selectedCategories.category1) {
      breadcrumbs.push(selectedCategories.category1);
    }
    if (selectedCategories.category2) {
      breadcrumbs.push(selectedCategories.category2);
    }
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumb(selectedCategories);

  const generateCategoryButtons = (categories, depth = 1) => {
    if (!categories || Object.keys(categories).length === 0) return "";

    const buttons = Object.keys(categories)
      .map((categoryName) => {
        const isSelected = selectedCategories[`category${depth}`] === categoryName;
        const selectedClass = isSelected
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50";

        return `
        <button data-category${depth}="${categoryName}" class="category${depth}-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${selectedClass}">
          ${categoryName}
        </button>
      `;
      })
      .join("");

    return `<div class="flex flex-wrap gap-2">${buttons}</div>`;
  };

  return `
    <div class="bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900">
              <a href="/" data-link="">쇼핑몰</a>
            </h1>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <span
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" style="display: none;">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${searchTerm}" class="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <!-- 검색 버튼 -->
              <button id="search-button" class="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
            <!-- 검색어가 있을 때 초기화 버튼 표시 -->
            ${
              searchTerm
                ? `
            <div class="mt-2 flex items-center gap-2">
              <span class="text-sm text-gray-600">검색어: "${searchTerm}"</span>
              <button id="clear-search-button" class="text-xs text-red-500 hover:text-red-700 underline">초기화</button>
            </div>
            `
                : ""
            }
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <!-- 브레드크럼 네비게이션 -->
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600">카테고리:</span>
                <div class="flex items-center gap-1">
                  ${breadcrumbs
                    .map((crumb, index) => {
                      if (index === 0) {
                        return `<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">${crumb}</button>`;
                      } else {
                        return `
                        <span class="text-gray-400">/</span>
                        <button data-breadcrumb="${index}" class="text-xs hover:text-blue-800 hover:underline">${crumb}</button>
                      `;
                      }
                    })
                    .join("")}
                </div>
              </div>
              
              <!-- 카테고리 버튼들 -->
              <div class="flex flex-wrap gap-2">
                ${
                  selectedCategories.category1 && categories[selectedCategories.category1]
                    ? generateCategoryButtons(categories[selectedCategories.category1], 2)
                    : generateCategoryButtons(categories, 1)
                }
              </div>
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              ${limitSelector(limit)}
              <!-- 정렬 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">정렬:</label>
                <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="price_asc" selected="">가격 낮은순</option>
                  <option value="price_desc">가격 높은순</option>
                  <option value="name_asc">이름순</option>
                  <option value="name_desc">이름 역순</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 개수 정보 -->
            <div class="mb-4 text-sm text-gray-600">
              ${!!totalProducts && `총 <span class="font-medium text-gray-900">${totalProducts}개</span>의 상품`}
              ${searchTerm ? ` (검색어: "${searchTerm}")` : ""}
              ${selectedCategories.category1 ? ` (카테고리: ${breadcrumbs.slice(1).join(" > ")})` : ""}
            </div>
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
            ${products.map(productCard).join("")}
            <div class="text-center py-4 text-sm text-gray-500">
              ${products.length === 0 ? "검색 결과가 없습니다." : "모든 상품을 확인했습니다"}
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `;
};
