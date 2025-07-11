const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};async function i(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function a(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function o(e,t,n=4){let r=new URLSearchParams({category2:e,limit:n.toString(),exclude:t}),i=await fetch(`/api/products?${r}`);return await i.json()}async function s(){let e=await fetch(`/api/categories`);return await e.json()}const c=e=>{let t=[10,20,50,100].map(t=>`<option value="${t}" ${t===e?`selected`:``}>${t}개</option>`);return`
    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">개수:</label>
      <select id="limit-select"
        class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
         ${t}
      </select>
    </div>
  `},l=e=>{let t=typeof e==`string`?parseInt(e,10):e;return t.toLocaleString(`ko-KR`)},u=e=>{let{productId:t,image:n,title:r,lprice:i,brand:a}=e;return`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
      data-product-id="${t}" data-product='${JSON.stringify(e)}'>
    <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image" 
           data-product-id="${t}">
      <img src="${n}"
          alt="${r}"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          loading="lazy">
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${r}</h3>
          <p class="text-xs text-gray-600 mb-2">${a||``}</p>
          <p class="text-lg font-bold text-gray-900">
            ${l(i)}원
          </p>
        </div>
        <!-- 장바구니 버튼 -->
        <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${t}">
          장바구니 담기
        </button>
      </div>
    </div>
  `},d=(e,t,n=``,r={},i={},a=0)=>{let o=e=>{let t=[`전체`];return e.category1&&t.push(e.category1),e.category2&&t.push(e.category2),t},s=o(i),l=(e,t=1)=>{if(!e||Object.keys(e).length===0)return``;let n=Object.keys(e).map(e=>{let n=i[`category${t}`]===e,r=n?`bg-blue-500 text-white border-blue-500`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button data-category${t}="${e}" class="category${t}-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${r}">
          ${e}
        </button>
      `}).join(``);return`<div class="flex flex-wrap gap-2">${n}</div>`};return`
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
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${n}" class="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg
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
            ${n?`
            <div class="mt-2 flex items-center gap-2">
              <span class="text-sm text-gray-600">검색어: "${n}"</span>
              <button id="clear-search-button" class="text-xs text-red-500 hover:text-red-700 underline">초기화</button>
            </div>
            `:``}
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <!-- 브레드크럼 네비게이션 -->
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600">카테고리:</span>
                <div class="flex items-center gap-1">
                  ${s.map((e,t)=>t===0?`<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">${e}</button>`:`
                        <span class="text-gray-400">/</span>
                        <button data-breadcrumb="${t}" class="text-xs hover:text-blue-800 hover:underline">${e}</button>
                      `).join(``)}
                </div>
              </div>
              
              <!-- 카테고리 버튼들 -->
              <div class="flex flex-wrap gap-2">
                ${i.category1&&r[i.category1]?l(r[i.category1],2):l(r,1)}
              </div>
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              ${c(t)}
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
              ${!!a&&`총 <span class="font-medium text-gray-900">${a}개</span>의 상품`}
              ${n?` (검색어: "${n}")`:``}
              ${i.category1?` (카테고리: ${s.slice(1).join(` > `)})`:``}
            </div>
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
            ${e.map(u).join(``)}
            <div class="text-center py-4 text-sm text-gray-500">
              ${e.length===0?`검색 결과가 없습니다.`:`모든 상품을 확인했습니다`}
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
  `},f=(e,t=`success`)=>{let n=document.querySelector(`.toast-notification`);n&&n.remove();let r={success:{bgColor:`bg-green-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>`},info:{bgColor:`bg-blue-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`},error:{bgColor:`bg-red-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>`}},i=r[t],a=`
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 toast-notification">
      <div class="${i.bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          ${i.icon}
        </div>
        <p class="text-sm font-medium">${e}</p>
        <button class="toast-close-btn flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,a);let o=document.querySelector(`.toast-close-btn`);o&&o.addEventListener(`click`,()=>{let e=document.querySelector(`.toast-notification`);e&&e.remove()}),setTimeout(()=>{let e=document.querySelector(`.toast-notification`);e&&e.remove()},3e3)},p=()=>{f(`장바구니에 추가되었습니다`,`success`)},m=()=>{f(`선택된 상품들이 삭제되었습니다`,`info`)},h=(e=`오류가 발생했습니다.`)=>{f(e,`error`)},g=()=>{let e=localStorage.getItem(`cart`);return e?JSON.parse(e):[]},_=e=>{try{let t=g(),n=t.findIndex(t=>t.productId===e.productId);return n===-1?t.push({...e,quantity:1}):t[n].quantity+=1,localStorage.setItem(`cart`,JSON.stringify(t)),b(),p(),t}catch(e){return h(`장바구니에 추가하는 중 오류가 발생했습니다.`),console.error(`장바구니 추가 오류:`,e),g()}},v=e=>{try{let t=g(),n=t.filter(t=>t.productId!==e);return localStorage.setItem(`cart`,JSON.stringify(n)),b(),m(),n}catch(e){return h(`상품을 삭제하는 중 오류가 발생했습니다.`),console.error(`장바구니 삭제 오류:`,e),g()}},y=()=>{try{let e=g(),t=document.querySelectorAll(`.cart-item-checkbox:checked`);if(t.length===0)return h(`삭제할 상품을 선택해주세요.`),e;let n=Array.from(t).map(e=>e.getAttribute(`data-product-id`)),r=e.filter(e=>!n.includes(e.productId));return localStorage.setItem(`cart`,JSON.stringify(r)),b(),m(),r}catch(e){return h(`선택된 상품을 삭제하는 중 오류가 발생했습니다.`),console.error(`선택 상품 삭제 오류:`,e),g()}},b=()=>{let e=g(),t=e.length,n=document.querySelector(`#cart-icon-btn span`);n&&(n.textContent=t,t===0?n.style.display=`none`:n.style.display=`flex`)},x=()=>{let e=g(),t=e.reduce((e,t)=>e+parseInt(t.lprice)*t.quantity,0),n=document.querySelector(`.cart-modal`);n&&n.remove();let r=`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
      <!-- 모달 컨테이너 -->
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              장바구니
              ${e.length>0?`<span class="text-sm font-normal text-gray-600 ml-1">(${e.length})</span>`:``}
            </h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            ${e.length===0?`
              <!-- 빈 장바구니 -->
              <div class="flex-1 flex items-center justify-center p-8">
                <div class="text-center">
                  <div class="text-gray-400 mb-4">
                    <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                  <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                </div>
              </div>
            `:`
              <!-- 전체 선택 섹션 -->
              <div class="p-4 border-b border-gray-200 bg-gray-50">
                <label class="flex items-center text-sm text-gray-700">
                  <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
                  전체선택 (${e.length}개)
                </label>
              </div>
              <!-- 아이템 목록 -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-4 space-y-4">
                  ${e.map(e=>`
                    <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e.productId}">
                      <!-- 선택 체크박스 -->
                      <label class="flex items-center mr-3">
                        <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                      focus:ring-blue-500" data-product-id="${e.productId}">
                      </label>
                      <!-- 상품 이미지 -->
                      <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="${e.productId}">
                      </div>
                      <!-- 상품 정보 -->
                      <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="${e.productId}">
                          ${e.title}
                        </h4>
                        <p class="text-sm text-gray-600 mt-1">
                          ${e.lprice}원
                        </p>
                        <!-- 수량 조절 -->
                        <div class="flex items-center mt-2">
                          <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                       border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="${e.productId}">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                            </svg>
                          </button>
                          <input type="number" value="${e.quantity}" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                      border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="${e.productId}">
                          <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                       border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="${e.productId}">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <!-- 가격 및 삭제 -->
                      <div class="text-right ml-3">
                        <p class="text-sm font-medium text-gray-900">
                          ${parseInt(e.lprice)*e.quantity}원
                        </p>
                        <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="${e.productId}">
                          삭제
                        </button>
                      </div>
                    </div>
                  `).join(``)}
                </div>
              </div>
            `}
          </div>
          ${e.length>0?`
            <!-- 하단 액션 -->
            <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <!-- 선택된 아이템 정보 -->
              <div class="flex justify-between items-center mb-3 text-sm">
                <span class="text-gray-600">선택한 상품 (0개)</span>
                <span class="font-medium">0원</span>
              </div>
              <!-- 총 금액 -->
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-bold text-gray-900">총 금액</span>
                <span class="text-xl font-bold text-blue-600">${t}원</span>
              </div>
              <!-- 액션 버튼들 -->
              <div class="space-y-2">
                <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                         hover:bg-red-700 transition-colors text-sm" style="display: none;">
                  선택한 상품 삭제 (0개)
                </button>
                <div class="flex gap-2">
                  <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                           hover:bg-gray-700 transition-colors text-sm">
                    전체 비우기
                  </button>
                  <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                           hover:bg-blue-700 transition-colors text-sm">
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          `:``}
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,r),S()},S=()=>{let e=document.getElementById(`cart-modal-close-btn`);e&&e.addEventListener(`click`,C);let t=document.querySelector(`.cart-modal-overlay`);t&&t.addEventListener(`click`,C);let n=e=>{e.key===`Escape`&&(C(),document.removeEventListener(`keydown`,n))};document.addEventListener(`keydown`,n);let r=document.getElementById(`cart-modal-select-all-checkbox`);r&&r.addEventListener(`change`,e=>{let t=document.querySelectorAll(`.cart-item-checkbox`);t.forEach(t=>{t.checked=e.target.checked}),d()});let i=document.querySelectorAll(`.cart-item-checkbox`);i.forEach(e=>{e.addEventListener(`change`,()=>{ee(),d()})});let a=document.querySelectorAll(`.quantity-increase-btn`);a.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.closest(`button`).getAttribute(`data-product-id`),n=g(),r=n.findIndex(e=>e.productId===t);r!==-1&&(n[r].quantity+=1,localStorage.setItem(`cart`,JSON.stringify(n)),b(),x())})});let o=document.querySelectorAll(`.quantity-decrease-btn`);o.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.closest(`button`).getAttribute(`data-product-id`),n=g(),r=n.findIndex(e=>e.productId===t);r!==-1&&n[r].quantity>1&&(--n[r].quantity,localStorage.setItem(`cart`,JSON.stringify(n)),b(),x())})});let s=document.querySelectorAll(`.cart-item-remove-btn`);s.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-product-id`);v(t),x()})});let c=document.getElementById(`cart-modal-clear-cart-btn`);c&&c.addEventListener(`click`,()=>{localStorage.removeItem(`cart`),b(),x()});let l=document.getElementById(`cart-modal-checkout-btn`);l&&l.addEventListener(`click`,()=>{alert(`구매 기능은 준비 중입니다.`)});let u=document.getElementById(`cart-modal-remove-selected-btn`);u&&u.addEventListener(`click`,()=>{y(),x()});let d=()=>{let e=document.querySelectorAll(`.cart-item-checkbox:checked`),t=document.getElementById(`cart-modal-remove-selected-btn`),n=document.querySelector(`.text-gray-600`),r=document.querySelector(`.font-medium`);if(e.length>0){let i=g(),a=Array.from(e).map(e=>e.getAttribute(`data-product-id`)),o=i.filter(e=>a.includes(e.productId)),s=o.reduce((e,t)=>e+parseInt(t.lprice)*t.quantity,0);n&&(n.textContent=`선택한 상품 (${e.length}개)`),r&&(r.textContent=`${s}원`),t&&(t.style.display=`block`,t.textContent=`선택한 상품 삭제 (${e.length}개)`)}else n&&(n.textContent=`선택한 상품 (0개)`),r&&(r.textContent=`0원`),t&&(t.style.display=`none`)}},ee=()=>{let e=document.getElementById(`cart-modal-select-all-checkbox`),t=document.querySelectorAll(`.cart-item-checkbox`);if(e&&t.length>0){let n=Array.from(t).filter(e=>e.checked).length;e.checked=n===t.length,e.indeterminate=n>0&&n<t.length}},C=()=>{let e=document.querySelector(`.cart-modal`);e&&e.remove()};let w=!1;const T=()=>{if(w)return;w=!0,document.addEventListener(`click`,e=>{if(e.target.classList.contains(`add-to-cart-btn`)){let t=e.target.getAttribute(`data-product-id`),n=e.target.closest(`.product-card`);if(n){let r={productId:t,title:n.querySelector(`h3`).textContent,image:n.querySelector(`img`).src,lprice:n.querySelector(`.text-lg`).textContent.replace(`원`,``)};_(r);let i=e.target.textContent;e.target.textContent=`담기 완료!`,e.target.classList.add(`bg-green-600`),e.target.classList.remove(`bg-blue-600`,`hover:bg-blue-700`),setTimeout(()=>{e.target.textContent=i,e.target.classList.remove(`bg-green-600`),e.target.classList.add(`bg-blue-600`,`hover:bg-blue-700`)},1e3)}}});let e=document.getElementById(`cart-icon-btn`);e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),x()})},E=()=>{let e=new URLSearchParams(window.location.search),t={};for(let[n,r]of e.entries())t[n]=r;return t},D=(e,t=!0)=>{let n=E(),r={...n,...e};Object.keys(r).forEach(e=>{(r[e]===``||r[e]===null||r[e]===void 0)&&delete r[e]});let i=new URLSearchParams(r),a=`${window.location.pathname}${i.toString()?`?`+i.toString():``}`;t?window.history.replaceState({},``,a):window.history.pushState({},``,a)},O=e=>{let t=E();return{...e,page:parseInt(t.page)||1,limit:parseInt(t.limit)||20,sort:t.sort||`price_asc`,search:t.search||``,category1:t.category1||``,category2:t.category2||``}};var te=class{constructor(e={}){this.state=e,this.subscribers=new Set,this.middlewares=[]}getState(){return{...this.state}}setState(e){let t={...this.state};this.state={...this.state,...e},this.middlewares.forEach(e=>{e(t,this.state)}),this.notifySubscribers(t,this.state)}setStateByKey(e,t){this.setState({[e]:t})}subscribe(e){return this.subscribers.add(e),()=>{this.subscribers.delete(e)}}notifySubscribers(e,t){this.subscribers.forEach(n=>{try{n(t,e)}catch(e){console.error(`상태 변경 콜백 실행 중 오류:`,e)}})}use(e){this.middlewares.push(e)}reset(e){let t={...this.state};this.state={...e},this.notifySubscribers(t,this.state)}getStateByKey(e){return this.state[e]}select(e){return e(this.state)}};const k=new te;var A=k;const ne={page:1,limit:20,sort:`price_asc`,search:``,category1:``,category2:``,isLoading:!1,hasMore:!0,products:[],categories:{},selectedCategories:{},totalProducts:0},re=O(ne);A.reset(re);var ie=class{constructor(){this.store=A}getState(){return this.store.getState()}setState(e){this.store.setState(e)}setStateByKey(e,t){this.store.setStateByKey(e,t)}subscribe(e){return this.store.subscribe(e)}setPage(e){this.setStateByKey(`page`,e)}setLoading(e){this.setStateByKey(`isLoading`,e)}setProducts(e){this.setStateByKey(`products`,e)}setCategories(e){this.setStateByKey(`categories`,e)}setSelectedCategories(e){this.setStateByKey(`selectedCategories`,e)}setSearch(e){this.setStateByKey(`search`,e)}setSort(e){this.setStateByKey(`sort`,e)}setLimit(e){this.setStateByKey(`limit`,e)}setHasMore(e){this.setStateByKey(`hasMore`,e)}setTotalProducts(e){this.setStateByKey(`totalProducts`,e)}setCategory1(e){this.setStateByKey(`category1`,e)}setCategory2(e){this.setStateByKey(`category2`,e)}addProducts(e){let t=this.getState().products;this.setProducts([...t,...e])}reset(){}resetFilters(){this.setState({page:1,search:``,category1:``,category2:``,selectedCategories:{},hasMore:!0,products:[]})}resetSearch(){this.setState({search:``,page:1,hasMore:!0,products:[]})}resetCategories(){this.setState({category1:``,category2:``,selectedCategories:{},page:1,hasMore:!0,products:[]})}};const ae=new ie;var j=ae;const M=async(e,t)=>{try{j.setState({page:1,search:e,hasMore:!0,products:[]}),D({search:e,page:1},!0);let n=j.getState(),{products:r,pagination:a}=await i({page:n.page,limit:n.limit,sort:n.sort,search:e,category1:n.category1,category2:n.category2});j.setState({products:r,hasMore:r.length===n.limit,totalProducts:a.total}),t&&t()}catch(e){console.error(`검색 실패:`,e)}},oe=async e=>{j.resetSearch();try{D({search:``,page:1},!0);let t=j.getState(),{products:n,pagination:r}=await i({page:t.page,limit:t.limit,sort:t.sort,category1:t.category1,category2:t.category2});j.setState({products:n,hasMore:n.length===t.limit,totalProducts:r.total}),e&&e()}catch(e){console.error(`검색 초기화 실패:`,e)}},se=(e,t)=>{ce(e),le(e),N(e),P(t),F(),I(e),T()},ce=e=>{let t=document.querySelectorAll(`.category1-filter-btn`);t.forEach(t=>{t.addEventListener(`click`,async t=>{let n=t.target.dataset.category1,r=j.getState();r.selectedCategories.category1===n?(j.setSelectedCategories({}),j.setCategory1(``),j.setCategory2(``),D({category1:``,category2:``},!0)):(j.setSelectedCategories({category1:n}),j.setCategory1(n),j.setCategory2(``),D({category1:n,category2:``},!0)),await e()})});let n=document.querySelectorAll(`.category2-filter-btn`);n.forEach(t=>{t.addEventListener(`click`,async t=>{let n=t.target.dataset.category2,r=j.getState();r.selectedCategories.category2===n?(j.setSelectedCategories({category1:r.selectedCategories.category1}),j.setCategory2(``),D({category2:``},!0)):(j.setSelectedCategories({category1:r.selectedCategories.category1,category2:n}),j.setCategory2(n),D({category2:n},!0)),await e()})});let r=document.querySelectorAll(`[data-breadcrumb]`);r.forEach(t=>{t.addEventListener(`click`,async t=>{let n=t.target.dataset.breadcrumb;if(n===`reset`)j.setSelectedCategories({}),j.setCategory1(``),j.setCategory2(``),D({category1:``,category2:``},!0);else{let e=parseInt(n),t=j.getState();e===1&&(j.setSelectedCategories({category1:t.selectedCategories.category1}),j.setCategory2(``),D({category2:``},!0))}await e()})})},le=e=>{let t=document.querySelector(`#sort-select`);if(!t)return;let n=j.getState();t.value=n.sort,t.addEventListener(`change`,async t=>{let r=t.target.value;r!==n.sort&&(j.setSort(r),D({sort:r},!0),await e())})},N=e=>{let t=document.getElementById(`limit-select`);if(!t)return;let n=j.getState();t.value=String(n.limit),t.addEventListener(`change`,async t=>{let r=parseInt(t.target.value,10);!isNaN(r)&&r!==n.limit&&(j.setLimit(r),D({limit:r},!0),await e())})},P=e=>{let t=!1,n=100,r=()=>{let r=window.location.pathname===`/`||window.location.pathname===``;if(!r||t)return;t=!0,setTimeout(()=>{t=!1},n);let i=j.getState();if(i.isLoading||!i.hasMore)return;let a=window.pageYOffset||document.documentElement.scrollTop,o=window.innerHeight,s=document.documentElement.scrollHeight;a+o>=s*.8&&e()};window.addEventListener(`scroll`,r)},F=()=>{document.addEventListener(`click`,e=>{let t=e.target.closest(`.product-image`);if(t){e.stopPropagation();let n=t.dataset.productId;n&&X(n)}}),document.addEventListener(`click`,e=>{let t=e.target.closest(`.add-to-cart-btn`);if(t){e.stopPropagation();let n=t.closest(`.product-card`);if(n){let e=JSON.parse(n.dataset.product);e&&r(async()=>{let{addToCart:e}=await import(`./cartHandler-HcEYDlrV.js`);return{addToCart:e}},[]).then(({addToCart:t})=>{t(e)})}}})},I=e=>{let t=document.getElementById(`search-input`),n=document.getElementById(`search-button`),r=document.getElementById(`clear-search-button`);t&&(n&&n.addEventListener(`click`,()=>{let n=t.value.trim();n&&M(n,e)}),t.addEventListener(`keypress`,n=>{if(n.key===`Enter`){let n=t.value.trim();n&&M(n,e)}}),r&&r.addEventListener(`click`,()=>{t.value=``,oe(e)}))},L=`
    <div class="min-h-screen bg-gray-50">
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
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">카테고리:</label>
                <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
              </div>
              <!-- 1depth 카테고리 -->
              <div class="flex flex-wrap gap-2">
                <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
              </div>
              <!-- 2depth 카테고리 -->
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 페이지당 상품 수 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">개수:</label>
                <select id="limit-select"
                        class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="10">
                    10개
                  </option>
                  <option value="20" selected="">
                    20개
                  </option>
                  <option value="50">
                    50개
                  </option>
                  <option value="100">
                    100개
                  </option>
                </select>
              </div>
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
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
              <!-- 로딩 스켈레톤 -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            
            <div class="text-center py-4">
              <div class="inline-flex items-center">
                <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
              </div>
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
  `,R=e=>{e.innerHTML=L},z=e=>{e.innerHTML=`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `},B=(e,t=null)=>j.subscribe((n,r)=>{if(t){let i=t(n),a=t(r);JSON.stringify(i)!==JSON.stringify(a)&&e(i)}else e(n)}),V=(e,t)=>{let n=[`page`,`limit`,`sort`,`search`,`category1`,`category2`],i=n.filter(n=>t[n]!==e[n]);if(i.length>0){let e={};i.forEach(n=>{t[n]!==void 0&&t[n]!==``&&(e[n]=t[n])}),Object.keys(e).length>0&&r(async()=>{let{updateQueryParams:e}=await import(`./queryStringHandler-CkmvJ2sX.js`);return{updateQueryParams:e}},[]).then(({updateQueryParams:t})=>{t(e)})}};j.store.use(V);const H=document.getElementById(`root`),U=e=>{H.innerHTML=d(e.products,e.limit,e.search,e.categories,e.selectedCategories,e.totalProducts),se(G,de),b()};B(U);const W=()=>{},ue=async()=>{try{let e=await s();j.setCategories(e)}catch(e){console.error(`카테고리 로딩 실패:`,e),j.setCategories({})}},G=async()=>{R(H);try{await ue();let e=j.getState(),{products:t,pagination:n}=await i({page:e.page,limit:e.limit,sort:e.sort,search:e.search,category1:e.category1,category2:e.category2});j.setState({products:t,page:1,hasMore:t.length===e.limit,totalProducts:n.total})}catch(e){console.error(`초기 상품 목록 로딩 실패:`,e),H.innerHTML=`<div class="p-4 text-red-600">상품을 불러오지 못했습니다.</div>`}},de=async()=>{let e=j.getState();if(!(e.isLoading||!e.hasMore)){j.setLoading(!0),j.setPage(e.page+1),R(H);try{let{products:t,pagination:n}=await i({page:e.page+1,limit:e.limit,sort:e.sort,search:e.search,category1:e.category1,category2:e.category2});if(!t||t.length===0){j.setHasMore(!1);return}j.addProducts(t),j.setTotalProducts(n.total)}catch(e){console.error(`다음 상품 로딩 실패:`,e)}finally{j.setLoading(!1)}}},fe=async()=>{W(),await G()},K=document.getElementById(`root`),pe=e=>{let t=Math.floor(e),n=e%1!=0,r=5-t-(n?1:0),i=``;for(let e=0;e<t;e++)i+=`
      <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    `;n&&(i+=`
      <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stop-color="currentColor"/>
            <stop offset="50%" stop-color="#d1d5db"/>
          </linearGradient>
        </defs>
        <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    `);for(let e=0;e<r;e++)i+=`
      <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    `;return i},me=e=>!e||e.length===0?`
      <div class="text-center text-gray-500 py-8">
        <p>관련 상품이 없습니다.</p>
      </div>
    `:e.map(e=>`
        <div class="related-product-card cursor-pointer" data-product-id="${e.productId}">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
            <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover">
          </div>
          <h3 class="text-sm font-medium text-gray-900 truncate mb-1">${e.title}</h3>
          <p class="text-sm text-gray-600">${e.lprice}원</p>
        </div>
      `).join(``),he=(e,t=[])=>{let{productId:n,title:r,image:i,lprice:a,brand:o,category1:s,category2:c,description:l,rating:u,reviewCount:d,stock:f}=e;K.innerHTML=`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button id="back-button" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style="display: none;"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            ${s?`
              <button class="breadcrumb-link" data-category1="${s}">
                ${s}
              </button>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            `:``}
            ${c?`
              <button class="breadcrumb-link" data-category2="${c}">
                ${c}
              </button>
            `:``}
          </div>
        </nav>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src="${i}" alt="${r}" class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1">${o||``}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  ${pe(u||4)}
                </div>
                <span class="ml-2 text-sm text-gray-600">${u||4} (${d||749}개 리뷰)</span>
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">${a}원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 ${f||107}개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                ${l||`${r}에 대한 상세 설명입니다. ${o||`브랜드`}의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.`}
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-900">수량</span>
              <div class="flex items-center">
                <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <input type="number" id="quantity-input" value="1" min="1" max="${f||107}" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            <!-- 액션 버튼 -->
            <button id="add-to-cart-btn" data-product-id="${n}" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium">
              장바구니 담기
            </button>
          </div>
        </div>
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button id="go-to-product-list" class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors">
            상품 목록으로 돌아가기
          </button>
        </div>
        <!-- 관련 상품 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              ${me(t)}
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
  `,ge(e),T(),b()},ge=e=>{let t=document.getElementById(`back-button`);t&&t.addEventListener(`click`,async()=>{await Q()});let n=document.getElementById(`quantity-increase`),r=document.getElementById(`quantity-decrease`),i=document.getElementById(`quantity-input`);n&&n.addEventListener(`click`,()=>{let e=parseInt(i.value),t=parseInt(i.max);e<t&&(i.value=e+1)}),r&&r.addEventListener(`click`,()=>{let e=parseInt(i.value);e>1&&(i.value=e-1)}),i&&i.addEventListener(`change`,()=>{let e=parseInt(i.value),t=parseInt(i.max);e<1?i.value=1:e>t&&(i.value=t)});let a=document.getElementById(`add-to-cart-btn`);a&&a.addEventListener(`click`,()=>{let t=parseInt(i.value),n={...e,quantity:t};_(n)});let o=document.getElementById(`go-to-product-list`);o&&o.addEventListener(`click`,async()=>{await Z()});let s=document.querySelectorAll(`.breadcrumb-link`);s.forEach(e=>{e.addEventListener(`click`,async t=>{t.preventDefault();let n=e.getAttribute(`data-category1`),r=e.getAttribute(`data-category2`);n?await Y(`/?category1=${n}`):r&&await Y(`/?category2=${r}`)})});let c=document.querySelectorAll(`.related-product-card`);c.forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-product-id`);t&&await X(t)})})},_e=async e=>{try{z(K);let t=await a(e);if(!t)throw Error(`상품을 찾을 수 없습니다.`);let n=[];if(t.category2)try{let r=await o(t.category2,e,4);n=r.products||r||[]}catch(e){console.error(`관련 상품 로딩 실패:`,e)}he(t,n)}catch(e){console.error(`상품 상세 로딩 실패:`,e),K.innerHTML=`
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h2>
          <p class="text-gray-600 mb-6">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
          <button id="error-back-button" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    `;let t=document.getElementById(`error-back-button`);t&&t.addEventListener(`click`,async()=>{await Q()})}},ve=()=>`
        <main class="max-w-md mx-auto px-4 py-4">
            <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
            <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
                </linearGradient>
                <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
                </filter>
                </defs>
                
                <!-- 404 Numbers -->
                <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
                
                <!-- Icon decoration -->
                <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
                <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
                <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
                <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
                
                <!-- Message -->
                <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
                
                <!-- Subtle bottom accent -->
                <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
            </svg>
            
            <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
            </div>
        </main>
    `,q=async e=>{if(e.startsWith(`/product/`)){let t=e.split(`/product/`)[1];if(t){await _e(t);return}}if(e===`/`||e===``){await fe();return}document.body.innerHTML=ve()},J=async()=>{await q(window.location.pathname),window.addEventListener(`popstate`,async()=>{await q(window.location.pathname)}),document.addEventListener(`click`,async e=>{let t=e.target.closest(`a[data-link]`);if(t){e.preventDefault();let n=t.getAttribute(`href`);window.history.pushState({},``,n),await q(n)}})},Y=async e=>{window.location.pathname!==e&&(window.history.pushState({},``,e),await q(e))},X=async e=>{let t=`/product/${e}`;window.location.pathname!==t&&(window.history.pushState({},``,t),await q(t))},Z=async()=>{let e=`/`;window.location.pathname!==e&&(window.history.pushState({},``,e),await q(e))},Q=async()=>{window.history.length>1?window.history.back():await Z()},ye=`/front_6th_chapter1-1/`,be=()=>r(async()=>{let{worker:e}=await import(`./browser-D14UcMCg.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`${ye}mockServiceWorker.js`}}));var xe=class{constructor(){this.isInitialized=!1}async initialize(){if(!this.isInitialized)try{await J(),this.isInitialized=!0}catch(e){console.error(`애플리케이션 초기화 실패:`,e)}}async restart(){this.isInitialized=!1,await this.initialize()}};const $=new xe;async function Se(){await $.initialize()}be().then(Se);export{$ as app,O as b,E as c,D as d,b as e,g as f,x as g,v as h,S as i,_ as j,T as k,y as l,C as m};