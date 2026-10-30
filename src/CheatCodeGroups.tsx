import type {Article} from './articles';
import type {Locale} from './content';
import {localeIndex} from './content';

type Groups=NonNullable<Article['sections'][number]['codeGroups']>;
export default function CheatCodeGroups({groups,locale}:{groups:Groups;locale:Locale}){
 const li=localeIndex(locale);
 const labels={es:['Truco o efecto','Código / combinación'],en:['Cheat or effect','Code / button sequence'],fr:['Code ou effet','Saisie / combinaison']}[locale];
 return <div className="cheat-code-groups">{groups.map((group,index)=><details key={index} className="cheat-code-group">
  <summary>{group.heading[li]} <span>({group.rows.length})</span></summary>
  <div className="cheat-table-wrap" role="region" aria-label={group.heading[li]} tabIndex={0}>
   <table className="cheat-table"><thead><tr>{labels.map(label=><th scope="col" key={label}>{label}</th>)}</tr></thead>
    <tbody>{group.rows.map((row,i)=><tr key={i}><th scope="row">{row.effect[li]}</th><td><code>{row.code}</code></td></tr>)}</tbody>
   </table>
  </div>
 </details>)}</div>;
}
