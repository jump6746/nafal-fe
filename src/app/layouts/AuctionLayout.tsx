import { useTopNavigationStore } from '@/shared/stores';
import { Layout, TopNavigation } from '@/shared/ui';

const AuctionLayout = () => {
  const text = useTopNavigationStore(state => state.text);

  return <Layout headerSlot={<TopNavigation type='text' title={text} />} />;
};

export default AuctionLayout;
