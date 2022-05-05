// 1. 이벤트 위임
// 2. 요구사항에 대해 전략적으로 접근 및 단계별로 세세하게 나누어 생각하기
// 3. DOM 요소를 가져올때는 $ 표시를 써서 변수로 사용
// 4. 메서드 innerText, innerHTML, insertAdjacentHtml, closest, e.target

// step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
// - [x] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌(confirm) 모달창이 뜬다.
// - [x] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.


//  step2 요구사항 - 상태 관리로 메뉴 관리하기
// TODO localStorage Read & Write
// - [ ] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [ ] 메뉴를 삭제할 때
// - [ ] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리 별 메뉴판 관리
// - [ ] 에스프레소 메뉴판 관리
// - [ ] 프라푸치노 메뉴판 관리
// - [ ] 블렌디드 메뉴판 관리
// - [ ] 티바나 메뉴판 관리
// - [ ] 디저트 메뉴판 관리

// TODO 페이지 접근 시 최초 데이터 Read & Rendering
// - [ ] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다.
// - [ ] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [ ] 품절 버튼을 추가한다.
// - [ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [ ] 클릭 이벤트에서 가장 가까운 <li> 태그의 class 속성 값에 sold-out 을 추가한다.


const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  }
}


function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = []; // 초기화

  // 메뉴 총 개수 업데이트 함수
  const updatedMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`
  }

  // 메뉴 이름 추가 함수
  const addMenuName = () => {

    if ($('#espresso-menu-name').value === '') { // 입력한 데이터가 빈 값일 경우
      alert('값을 입력해주세요.');
      return;
    }

    const espressMenuName = $('#espresso-menu-name').value;
    this.menu.push({ name: espressMenuName });
    store.setLocalStorage(this.menu); // localStorage 저장

    const template = this.menu.map((menuItem, index) => {
      return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
    }).join("");

    // const menuItemTemplate = (espressMenuName) => {
    //   return `<li class="menu-list-item d-flex items-center py-2">
    //                 <span class="w-100 pl-2 menu-name">${espressMenuName}</span>
    //                 <button
    //                   type="button"
    //                   class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    //                 >
    //                   수정
    //                 </button>
    //                 <button
    //                   type="button"
    //                   class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    //                 >
    //                   삭제
    //                 </button>
    //               </li>`;
    // };
    // innerHTML
    // $('#espresso-menu-list').innerHTML = (menuItemTemplate(espressMenuName));
    // insertAdjacentHTML
    // $('#espresso-menu-list').insertAdjacentHTML("beforeend", menuItemTemplate(espressMenuName));

    $('#espresso-menu-list').innerHTML = template;

    updatedMenuCount();
    $('#espresso-menu-name').value = ''; // 추가 후 input 초기화

  }

  // 메뉴 수정 함수
  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu)
    $menuName.innerText = updatedMenuName;
  }

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      updatedMenuCount();
    }
  }

  $('#espresso-menu-list').addEventListener("click", (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault(); // form 태그가 전송되는걸 막아준다.
  })

  // 확인 버튼 클릭 시
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  // 사용자가 처음 입력한 값 Enter 체크
  $('#espresso-menu-name').addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

const app = new App();


