import React from 'react';
import Options from './Options';
import { render, fireEvent } from '@testing-library/react';


describe('Options component', () => {
    it('when selecting the option Yes, the target value should be 10', async () => {
        const callback = (e) => {
              const value = e.target.value;
              expect(value).toEqual('10');
        }
        const { getByLabelText } = render( <Options onAnswer={callback} /> );
        const Yes = getByLabelText('Yes')
        await fireEvent.click(Yes);
    });
    it('when selecting the option Partly, the target value should be 5', async() => {
        const callback = (e) => {
            const value = e.target.value;
            expect(value).toEqual('5');
      }
      const { getByLabelText } = render( <Options onAnswer={callback} /> );
      const Partly = getByLabelText('Partly')
      await fireEvent.click(Partly);
    });
    it('when selecting the option No, the target value should be 0', async() => {
        const callback = (e) => {
            const value = e.target.value;
            expect(value).toEqual('0');
      }
      const { getByLabelText } = render( <Options onAnswer={callback} /> );
      const No = getByLabelText('No')
      await fireEvent.click(No);
    });
});