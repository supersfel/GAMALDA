import Header from 'components/modules/Header/Header';
import ProjSetBody from 'components/projectSet/ProjSetBody';
import ProjSetSelect from 'components/projectSet/ProjSetSelect';
import { selectType } from 'components/projectSet/type';
import React, { useState } from 'react';

const ProjectSet = () => {
  const [selectItem, setSelectItem] = useState<selectType>('');

  return (
    <>
      <Header />
      <div className="projectset-body">
        <ProjSetSelect
          selectItem={selectItem}
          setSelectItem={setSelectItem}
        ></ProjSetSelect>
        <ProjSetBody selectItem={selectItem}></ProjSetBody>
      </div>
    </>
  );
};

export default ProjectSet;
