// 이미지 파일들을 동적으로 불러오는 함수
export function importAll(r) {
    let images = {}; // 이미지를 저장할 객체
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);  // 파일 이름을 키로 저장
    });
    return images;
}

// 이미지 파일들을 한 번에 가져오기
export const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
