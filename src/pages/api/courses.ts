import { NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/next-server/server/api-utils";

export default (req: NextApiRequestQuery, res: NextApiResponse) => {
  const courses = [
    { id: 1, name: 'Next.js com typescript' },
    { id: 2, name: 'React.js com typescript' },
    { id: 3, name: 'SASS' },
    { id: 4, name: 'styled-components' },
  ];

  return res.json(courses)
}