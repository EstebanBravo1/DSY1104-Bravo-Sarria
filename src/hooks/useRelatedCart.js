import {useMemo} from 'react';
import {productos} from '../data/product';

export function useRelatedProducts(category, codigoActual){
    return useMemo(
        ()=> productos.filter(p => p.categoria == category && p.codigo !== codigoActual),
        [category,codigoActual]
    )
}