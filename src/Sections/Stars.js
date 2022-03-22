import React from 'react';
import { Image, Grid } from '@mantine/core';
import Star from '../img/star.png';

function Stars() {
  return (
    <Grid>
      <Grid.Col span={1}>
        <Image src={Star} className="w-6" />
      </Grid.Col>
      <Grid.Col span={1}>
        <Image src={Star} className="w-6" />
      </Grid.Col>

      <Grid.Col span={1}>
        <Image src={Star} className="w-6" />
      </Grid.Col>

      <Grid.Col span={1}>
        <Image src={Star} className="w-6" />
      </Grid.Col>

      <Grid.Col span={1}>
        <Image src={Star} className="w-6" />
      </Grid.Col>
    </Grid>
  );
}

export default Stars;
