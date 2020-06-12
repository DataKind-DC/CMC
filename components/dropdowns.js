import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'

const Select = dynamic(
          () => import('react-select').then((mod) => mod.default),
          {
            ssr: false,
            loading: () => null,
          },
        );

function Dropdowns(props) {
        return (
                    <Select
                        isMulti={true}
                        options={props.options}
                    />
        );
}

export default Dropdowns