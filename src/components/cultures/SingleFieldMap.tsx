
import React from 'react';
import { CultureFieldProps } from './CultureField';
import SimpleInteractiveMap from './SimpleInteractiveMap';

interface SingleFieldMapProps {
  field: any;
}

const SingleFieldMap = ({ field }: SingleFieldMapProps) => {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden border">
      <SimpleInteractiveMap fields={[]} singleField={field} />
    </div>
  );
};

export default SingleFieldMap;
