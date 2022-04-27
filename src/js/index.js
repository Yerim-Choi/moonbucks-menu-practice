
// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.


const $ = (selector) => document.querySelector(selector);

function App() {
  // form 태그가 전송되는걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  })
  // 메뉴의 이름을 입력받는건
  $('#espresso-menu-name').addEventListener("keypress", (e) => {
    // 사용자가 처음 입력한 값이 Enter가 아닌 경우
    if (e.key !== "Enter") {
      return;
    }
    // 입력한 데이터가 빈 값일 경우
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요.');
      return;
    }

    const espressMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = (espressMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressMenuName}</span>
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
    };
    // innerHTML
    // $('#espresso-menu-list').innerHTML = (menuItemTemplate(espressMenuName));
    // insertAdjacentHTML
    $('#espresso-menu-list').insertAdjacentHTML("beforeend", menuItemTemplate(espressMenuName));

    // innerText
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`

    // 추가 후 input 초기화
    $('#espresso-menu-name').value = '';

  });
}

App();


// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
// - [ ] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [ ] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.