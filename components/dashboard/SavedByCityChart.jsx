'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

/** Simple bar chart of saved properties per city. Single series, so a single colour. */
export default function SavedByCityChart({ data }) {
  return (
    <div style={{ width: '100%', height: 220 }} role="img" aria-label={`Saved properties by city: ${data.map((d) => `${d.city} ${d.count}`).join(', ')}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#dbe5dd" />
          <XAxis dataKey="city" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#5f7066' }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#5f7066' }} />
          <Tooltip cursor={{ fill: 'rgba(46,139,87,0.08)' }} formatter={(v) => [v, 'Saved']} contentStyle={{ borderRadius: 10, border: '1px solid #dbe5dd' }} />
          <Bar dataKey="count" fill="#2e8b57" radius={[6, 6, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
