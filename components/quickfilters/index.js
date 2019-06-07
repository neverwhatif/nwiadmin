import React from 'react';

import Button from 'nwiadmin/components/button';

import styles from './styles.scss';

const QuickFilters = ({ data, setFilter }) => (
    <div className={styles.root}>{data.filter(item => item !== null).map(item => <Button key={item.name} buttonStyle="bordered" onClick={() => setFilter(item.filter)}>{item.name}</Button>)}</div>
);

export default QuickFilters;
