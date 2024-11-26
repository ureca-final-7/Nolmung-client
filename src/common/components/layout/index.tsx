import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { S } from '@common/components/layout/index.styles';
import Header from '@common/components/header';
import { Flex as MainLayout } from '@common/components/layout/flex';
import {
  LayoutProps,
  HeaderTitleType,
} from '@common/components/layout/index.type';
import TabBar from '@common/components/tabBar';

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Header가 필요 없는 페이지의 경우 path 추가하기
  const noHeaderPaths = ['/'];
  const hideHeader = noHeaderPaths.includes(location.pathname);

  const [HeaderTitle, setHeaderTitle] = useState<HeaderTitleType>({
    title: '',
    showIcon: false,
    type: 1,
  });

  //
  // Type1 : titleLocation:left, Type2:titleLocation : right
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setHeaderTitle({ title: '메인', showIcon: true, type: 2 });
        break;
      case '/todayMung':
        setHeaderTitle({
          title: '오늘멍 모아보기',
          showIcon: false,
          type: 1,
        });
        break;

      default:
        setHeaderTitle({ title: '', showIcon: true, type: 1 });
    }
  }, [location.pathname]);

  return (
    <S.Wrapper>
      {!hideHeader && <Header {...HeaderTitle} />}
      <MainLayout $direction="column" $justify="flex-start" $align="flex-start">
        {children}
      </MainLayout>
      <TabBar />
    </S.Wrapper>
  );
}

export default Layout;
