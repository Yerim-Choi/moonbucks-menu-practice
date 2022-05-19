// step1 
// 1. 이벤트 위임
// 2. 요구사항에 대해 전략적으로 접근 및 단계별로 세세하게 나누어 생각하기
// 3. DOM 요소를 가져올때는 $ 표시를 써서 변수로 사용
// 4. 메서드 innerText, innerHTML, insertAdjacentHtml, closest, e.target
// step2
// 5. 상탯값의 중요성
// 6. this

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


// step2 요구사항 - 상태 관리로 메뉴 관리하기
// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [x] 메뉴를 삭제할 때
// - [x] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리 별 메뉴판 관리
// - [x] 에스프레소 메뉴판 관리
// - [x] 프라푸치노 메뉴판 관리
// - [x] 블렌디드 메뉴판 관리
// - [x] 티바나 메뉴판 관리
// - [x] 디저트 메뉴판 관리

// TODO 페이지 접근 시 최초 데이터 Read & Rendering
// - [x] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다.
// - [x] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [x] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [x] 품절 버튼을 추가한다.
// - [x] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [x] 클릭 이벤트에서 가장 가까운 <li> 태그의 class 속성 값에 sold-out 을 추가한다.
import { $ } from './utils/dom.js'
import store from './store/index.js'


// step3
// TODO 서버 요청 부분
// - [x} 웹 서버를 띄운다.
// - [] 서버에 새로운 메뉴명을 추가될 수 있도록 요청한다.
// - [] 서버에 카테고리별 메뉴리스트를 불러온다.
// - [] 서버에 메뉴가 수정 될 수 있도록 요청한다.
// - [] 서버에 메뉴의 품절상태를 토글될 수 있도록 요청한다.
// - [] 서버에 메뉴가 삭제 될 수 있도록 요청한다.

// TODO 리팩터링 부분
// - [] localStorage에 저장하는 로직은 지운다.
// - [] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

// TODO 사용자 경험
// - [] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// - [] 중복되는 메뉴는 추가할 수 없다.


const BASE_URL = "http://localhost:3000/api"

const MenuApi = {
  async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`)
    return response.json();
  },
}

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  }; // 초기화
  this.currentCategory = 'espresso';
  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    render();
    initEventListeners();
  };

  const render = () => {

    const template = this.menu[this.currentCategory].map((menuItem, index) => {
      return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""}">${menuItem.name}</span>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
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

    $('#menu-list').innerHTML = template;
    updatedMenuCount();

  };

  // 메뉴 총 개수 업데이트 함수
  const updatedMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerText = `총 ${menuCount}개`
  }

  // 메뉴 이름 추가 함수
  const addMenuName = async () => {

    if ($('#menu-name').value === '') { // 입력한 데이터가 빈 값일 경우
      alert('값을 입력해주세요.');
      return;
    }
    const menuName = $('#menu-name').value;

    await fetch(`${BASE_URL}/category/${this.currentCategory}/menu`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: menuName }),
    }).then((response) => {
      return response.json();
    });

    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    render();
    $('#menu-name').value = ''; // 추가 후 input 초기화

  }

  // 메뉴 수정 함수
  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu)
    render();
  }

  // 메뉴 삭제 함수
  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu)
      render();
    }
  }

  // 메뉴 품절 함수
  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  }


  const initEventListeners = () => {

    $('#menu-list').addEventListener("click", (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault(); // form 태그가 전송되는걸 막아준다.
    })

    // 확인 버튼 클릭 시
    $('#menu-submit-button').addEventListener('click', addMenuName);

    // 사용자가 처음 입력한 값 Enter 체크
    $('#menu-name').addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      addMenuName();
    });

    $('nav').addEventListener('click', (e) => {
      const isCategoryButton = e.target.classList.contains('cafe-category-name')
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    })

  }

}

const app = new App();
app.init();

