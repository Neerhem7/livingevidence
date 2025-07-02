import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchActiveProjectWeb } from '../redux/projectSlice';
import Prisma from '../components/Prisma/Prisma';
import ITable from '../components/SummaryTables/ITable';
import Introduction from '../components/Introduction/Introduction';
import '../styles/style.css';

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  home: Introduction,
  introduction: Introduction,
  prisma: Prisma,
  itable: ITable,
  // Add more mappings as needed
};

const PublicWeb: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeProjectWeb = useAppSelector((state) => state.projects.activeProjectWeb);
  const dispatch = useAppDispatch();

  const projectId = searchParams.get('projectId');
  const cqId = searchParams.get('cqId');

  useEffect(() => {
    if (projectId && cqId) {
      dispatch(fetchActiveProjectWeb({ projectId, cqId }));
    }
  }, [dispatch, projectId, cqId]);

  if (!activeProjectWeb || !activeProjectWeb.main_content) {
    return <div>Loading...</div>;
  }
  const navigation = activeProjectWeb.navigation || [];
  const mainContent = activeProjectWeb.main_content || {};

  return (

    <div className="m-4">
      {navigation.filter((item: any) => item.isvisible).map((item: any) => (
        <React.Fragment key={item.section}>
          <section id={item.section}>
            {sectionComponents[item.section]
              ? React.createElement(
                  sectionComponents[item.section],
                  item.section === 'introduction' || item.section === 'home'
                    ? activeProjectWeb?.main_content?.introduction || {}
                    : mainContent[item.section] || {}
                )
              : <h2>{item.title}</h2>
            }
          </section>
          {item.sub_nav && item.sub_nav.length > 0 && item.sub_nav.filter((sub: any) => sub.isvisible).map((sub: any) => (
            <section id={sub.section} key={sub.section}>
              {sectionComponents[sub.section]
                ? React.createElement(sectionComponents[sub.section], mainContent[sub.section] || {})
                : <h3>{sub.title}</h3>
              }
            </section>
          ))}
               <div className='bottom-full-line'></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PublicWeb;
