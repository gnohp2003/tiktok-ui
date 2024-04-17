import { memo } from 'react';
import AccountItem from '~/components/AccountItems/AccountItems';

function SearchItems({ searchResult, handleHideSearchResult }) {
  return searchResult.map((result) => (
    <AccountItem
      key={result.id}
      data={result}
      onClick={handleHideSearchResult}
    />
  ));
}

export default memo(SearchItems);
