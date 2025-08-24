import { useTopNavigationStore } from '@/shared/stores';
import { Layout, TopNavigation, LoginModal } from '@/shared/ui';

const AuctionLayout = () => {
  const text = useTopNavigationStore(state => state.text);

  return (
    <Layout headerSlot={<TopNavigation type='text' title={text} />} modalSlot={<LoginModal />} />
  );
};

export default AuctionLayout;
