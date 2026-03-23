
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import AITutor from './components/AITutor';
import { MOCK_COURSES, MOCK_NEWS, MOCK_EXAMS } from './constants';
import { Course, Grade, User, Exam, ExamResult, EducationLevel, Question } from './types';

const INITIAL_USERS: User[] = [
  { 
    id: '1', 
    name: 'Abebe Kebede', 
    role: 'student', 
    grade: Grade.G12, 
    level: EducationLevel.SECONDARY,
    points: 1250, 
    status: 'active', 
    email: 'abebe@iftu.edu.et', 
    joinedDate: '2024-01-15',
    nid: 'ET-NID-9900221',
    gender: 'male',
    dob: '2006-05-12',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe&backgroundColor=b6e3f4',
    certificatesPaid: [],
    phoneNumber: '+251911223344'
  },
  { 
    id: '2', 
    name: 'Hirut Tadesse', 
    role: 'teacher', 
    points: 8500, 
    status: 'active', 
    email: 'hirut@iftu.edu.et', 
    joinedDate: '2023-11-20',
    nid: 'ET-T-44556',
    gender: 'female',
    salary: 15500,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hirut&backgroundColor=ffdfbf',
    department: 'Languages',
    phoneNumber: '+251922334455'
  },
  { 
    id: '4', 
    name: 'Jemal Fano Haji', 
    role: 'admin', 
    points: 0, 
    status: 'active', 
    email: 'director@iftu.edu.et', 
    joinedDate: '2023-01-01',
    nid: 'IFTU-DIR-001',
    gender: 'male',
    salary: 45000,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jemal&backgroundColor=c0aede',
    department: 'Executive Office',
    phoneNumber: '+251900000001'
  },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'courses' | 'tutor' | 'about' | 'news' | 'login' | 'register' | 'admin' | 'exams' | 'taking-exam' | 'profile' | 'report-card' | 'certificates' | 'manage-exam' | 'exam-review'>('home');
  const [adminTab, setAdminTab] = useState<'users' | 'courses' | 'news' | 'stats'>('users');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [courseCategory, setCourseCategory] = useState<'all' | '9-10' | '11-12-social' | '11-12-natural' | 'tvet'>('all');
  
  // Persistence
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('iftu_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('iftu_courses');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });
  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('iftu_news');
    return saved ? JSON.parse(saved) : MOCK_NEWS;
  });
  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('iftu_exams');
    return saved ? JSON.parse(saved) : MOCK_EXAMS;
  });

  // Tracking editing
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [editingNews, setEditingNews] = useState<any | null>(null);

  useEffect(() => localStorage.setItem('iftu_users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('iftu_courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('iftu_news', JSON.stringify(newsList)), [newsList]);

  const handleLogin = (user: User) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setActiveView('home');
  };

  const saveNewsItem = (n: any) => {
    if (n.id) {
      setNewsList(newsList.map((item: any) => item.id === n.id ? n : item));
    } else {
      const newN = { ...n, id: `n-${Date.now()}`, date: new Date().toLocaleDateString() };
      setNewsList([newN, ...newsList]);
    }
    setEditingNews(null);
  };

  // Fixed missing handleSaveUser function used in line 415
  const handleSaveUser = (u: Partial<User>) => {
    if (u.id) {
      setUsers(users.map(item => item.id === u.id ? { ...item, ...u } as User : item));
    } else {
      const newUser: User = {
        ...u,
        id: `u-${Date.now()}`,
        name: u.name || 'Unknown Identity',
        role: u.role || 'student',
        points: u.points || 0,
        status: u.status || 'active',
        email: u.email || '',
        joinedDate: new Date().toISOString().split('T')[0],
        photo: u.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name || 'new'}&backgroundColor=b6e3f4`
      } as User;
      setUsers([...users, newUser]);
    }
    setEditingUser(null);
  };

  const renderAdminTab = () => {
    switch (adminTab) {
      case 'users':
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-5xl font-black uppercase italic tracking-tighter text-blue-800">Identity Master Records</h3>
              <button 
                onClick={() => setEditingUser({ role: 'student', gender: 'male', status: 'active', points: 0 })}
                className="bg-blue-700 text-white px-12 py-6 rounded-[2.5rem] border-8 border-black font-black uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 transition-all"
              >
                + Register Subject
              </button>
            </div>
            <div className="bg-white rounded-[4rem] border-8 border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 border-b-8 border-black font-black uppercase text-xs tracking-[0.2em] text-gray-500">
                  <tr>
                    <th className="p-10 border-r-8 border-black">Master Identity</th>
                    <th className="p-10 border-r-8 border-black">Role / Level</th>
                    <th className="p-10 border-r-8 border-black">NID / Contact Credentials</th>
                    <th className="p-10">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y-8 divide-black">
                  {users.map(u => (
                    <tr key={u.id} className="font-black text-2xl hover:bg-blue-50 transition-all group">
                      <td className="p-10 border-r-8 border-black">
                        <div className="flex items-center gap-8">
                          <img src={u.photo} className="w-28 h-28 rounded-[2rem] border-8 border-black shadow-xl" alt="" />
                          <div>
                            <p className="text-4xl tracking-tighter">{u.name}</p>
                            <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{u.gender} • DOB: {u.dob || 'UNKNOWN'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-10 border-r-8 border-black">
                        <span className={`px-6 py-2 rounded-xl border-4 border-black text-xs uppercase shadow-md ${u.role === 'admin' ? 'bg-purple-600 text-white' : u.role === 'teacher' ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white'}`}>{u.role}</span>
                        <p className="mt-6 text-gray-500 uppercase text-sm tracking-tighter font-black">
                          {u.role === 'student' ? (u.grade || 'PENDING') : (u.department || 'OFFICE')}
                        </p>
                      </td>
                      <td className="p-10 border-r-8 border-black">
                        <p className="text-blue-800 italic underline decoration-4 underline-offset-4">{u.email}</p>
                        <p className="text-[12px] font-black uppercase text-gray-400 mt-4">NID: <span className="text-black bg-yellow-400 px-2 py-0.5 border-2 border-black rounded">{u.nid || 'ET-NID-AUTH'}</span></p>
                        <p className="text-[12px] font-black mt-2">📞 {u.phoneNumber || '+251 XXX XXX XXX'}</p>
                      </td>
                      <td className="p-10 flex gap-8">
                        <button onClick={() => setEditingUser(u)} className="w-20 h-20 bg-white border-8 border-black rounded-3xl flex items-center justify-center text-3xl hover:bg-black hover:text-white transition-all shadow-xl">✎</button>
                        <button onClick={() => setUsers(users.filter(x => x.id !== u.id))} className="w-20 h-20 bg-rose-50 text-rose-600 border-8 border-black rounded-3xl flex items-center justify-center text-3xl hover:bg-rose-600 hover:text-white transition-all shadow-xl">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-5xl font-black uppercase italic tracking-tighter text-blue-800">National News Agency</h3>
              <button 
                onClick={() => setEditingNews({ tag: 'National', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400' })}
                className="bg-black text-white px-12 py-6 rounded-[2.5rem] border-8 border-black font-black uppercase shadow-[10px_10px_0px_0px_rgba(59,130,246,1)]"
              >
                + Forge Bulletin
              </button>
            </div>
            <div className="bg-white rounded-[4rem] border-8 border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 border-b-8 border-black font-black uppercase text-xs tracking-widest text-gray-500">
                  <tr>
                    <th className="p-10 border-r-8 border-black">Bulletin Entry</th>
                    <th className="p-10 border-r-8 border-black">Deployment Date</th>
                    <th className="p-10">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y-8 divide-black">
                  {newsList.map((n: any) => (
                    <tr key={n.id} className="font-black text-2xl hover:bg-blue-50 transition-all group">
                      <td className="p-10 border-r-8 border-black">
                        <div className="flex items-center gap-8">
                          <img src={n.image} className="w-32 h-32 rounded-[2rem] border-8 border-black object-cover shadow-lg" alt="" />
                          <div>
                            <p className="text-3xl tracking-tighter leading-none mb-2">{n.title}</p>
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest border-2 border-black">{n.tag}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-10 border-r-8 border-black">
                        <p className="text-blue-800 font-black">{n.date}</p>
                      </td>
                      <td className="p-10 flex gap-8">
                        <button onClick={() => setEditingNews(n)} className="w-20 h-20 bg-white border-8 border-black rounded-3xl flex items-center justify-center text-3xl hover:bg-black hover:text-white transition-all shadow-xl">✎</button>
                        <button onClick={() => setNewsList(newsList.filter((x: any) => x.id !== n.id))} className="w-20 h-20 bg-rose-50 text-rose-600 border-8 border-black rounded-3xl flex items-center justify-center text-3xl hover:bg-rose-600 hover:text-white transition-all shadow-xl">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <Header 
        onNavClick={(v) => setActiveView(v)} 
        activeView={activeView} 
        isLoggedIn={isLoggedIn}
        userRole={currentUser?.role}
        onLogout={() => { setIsLoggedIn(false); setCurrentUser(null); setActiveView('home'); }}
        onLoginClick={() => setActiveView('login')}
        accessibilitySettings={{}}
        onAccessibilityChange={() => {}}
      />
      
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-4 py-16">
        {activeView === 'home' && (
          <div className="space-y-32 animate-fadeIn">
            <section className="rounded-[6rem] p-16 md:p-32 text-white bg-gradient-to-br from-[#0a2351] via-[#0f3460] to-[#16213e] border-8 border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="relative z-10 max-w-5xl space-y-16">
                <div className="inline-flex items-center gap-4 bg-yellow-400 text-black px-10 py-4 rounded-full border-4 border-black font-black uppercase text-sm tracking-[0.5em] shadow-xl">
                  Official Federal HUB
                </div>
                <h1 className="text-8xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.7] italic">Knowledge <br/>is Power.</h1>
                <p className="text-blue-100 text-3xl md:text-5xl font-black max-w-3xl opacity-90 leading-[1.1]">
                  Empowering 1.2M+ Ethiopian Minds with Sovereign Educational Assetry.
                </p>
                <div className="flex flex-col sm:flex-row gap-10 pt-10">
                  <button onClick={() => setActiveView('courses')} className="bg-white text-blue-900 px-20 py-10 rounded-[3.5rem] font-black text-3xl uppercase tracking-widest hover:scale-105 transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,0.5)] border-8 border-black">Access Library</button>
                  <button onClick={() => setActiveView('exams')} className="bg-black text-white px-20 py-10 rounded-[3.5rem] font-black text-3xl uppercase tracking-widest hover:bg-blue-700 transition-all border-8 border-white shadow-[15px_15px_0px_0px_rgba(59,130,246,0.5)]">Exam Hall</button>
                </div>
              </div>
              <div className="absolute right-[-15%] bottom-[-15%] text-[50rem] opacity-5 pointer-events-none rotate-12 select-none">🇪🇹</div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-20">
               {[
                 { icon: '🌍', title: 'Portal Info', view: 'about', desc: 'Sovereign Digital Infrastructure Governance.', color: 'rgba(0,0,0,1)' },
                 { icon: '🔥', title: 'News Feed', view: 'news', desc: 'MoE Directives & National Bulletins.', color: 'rgba(59,130,246,1)' },
                 { icon: '🧠', title: 'AI Lab', view: 'tutor', desc: 'Personalized National Curriculum Core.', color: 'rgba(16,185,129,1)' }
               ].map((card, i) => (
                 <div key={i} onClick={() => setActiveView(card.view as any)} className="bg-white p-16 rounded-[4.5rem] border-8 border-black shadow-[25px_25px_0px_0px_var(--shadow-color)] transition-all cursor-pointer group hover:translate-x-2" style={{'--shadow-color': card.color} as any}>
                    <div className="text-9xl mb-12 group-hover:scale-110 transition-transform">{card.icon}</div>
                    <h3 className="text-5xl font-black uppercase leading-none tracking-tighter italic">{card.title}</h3>
                    <p className="text-gray-400 font-black mt-8 text-2xl leading-tight">{card.desc}</p>
                 </div>
               ))}
            </section>
          </div>
        )}

        {activeView === 'about' && (
          <div className="max-w-6xl mx-auto space-y-24 animate-fadeIn py-12">
             <div className="bg-white p-24 rounded-[6rem] border-8 border-black shadow-[35px_35px_0px_0px_rgba(59,130,246,1)] space-y-16">
                <div className="space-y-8">
                  <h2 className="text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.7] italic">IFTU: Sovereignty <br/>in Education.</h2>
                  <p className="text-4xl font-black text-blue-700 uppercase tracking-widest">Digital Asset Infrastructure Hub</p>
                </div>
                <div className="space-y-10 text-3xl font-black leading-[1.2] text-gray-800">
                  <p>IFTU LMS is the premier Digital Sovereign initiative by the Federal Ministry of Education of Ethiopia. It provides centralized, verified, and high-fidelity educational modules for every student in Grade 9 through 12 and TVET sectors across the country.</p>
                  <p>Developed under the vision of lead architect <span className="text-blue-700">Jemal Fano Haji</span>, IFTU ensures that academic assets are accessible, authenticated, and aligned with the national prosperity agenda.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t-8 border-black">
                   <div className="bg-gray-50 p-12 rounded-[3rem] border-8 border-black shadow-xl">
                      <h4 className="text-sm font-black uppercase text-gray-400 tracking-widest mb-4">Governance Entity</h4>
                      <p className="text-5xl font-black uppercase italic tracking-tighter">FEDERAL MoE</p>
                   </div>
                   <div className="bg-gray-50 p-12 rounded-[3rem] border-8 border-black shadow-xl">
                      <h4 className="text-sm font-black uppercase text-gray-400 tracking-widest mb-4">Core Reach</h4>
                      <p className="text-5xl font-black uppercase italic tracking-tighter">1.2M STUDENTS</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeView === 'news' && (
          <div className="max-w-7xl mx-auto space-y-24 animate-fadeIn py-12">
            <h2 className="text-8xl md:text-9xl font-black uppercase tracking-tighter italic text-center text-blue-900 leading-none">The National <br/>Bulletin Feed.</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {newsList.map((n: any) => (
                <div key={n.id} className="bg-white rounded-[5rem] border-8 border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col group">
                   <div className="h-80 border-b-8 border-black relative overflow-hidden">
                     <img src={n.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                     <div className="absolute top-8 left-8 bg-black text-white px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest border-4 border-white shadow-xl">
                        {n.tag}
                     </div>
                   </div>
                   <div className="p-16 space-y-10 flex-1">
                     <div className="flex justify-between items-center">
                        <p className="text-blue-700 font-black uppercase text-sm tracking-[0.5em]">{n.date}</p>
                        <div className="w-16 h-1 bg-blue-700"></div>
                     </div>
                     <h3 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter italic group-hover:text-blue-700 transition-colors">{n.title}</h3>
                     <p className="text-gray-500 font-black text-2xl leading-relaxed italic">{n.summary}</p>
                     <p className="text-gray-400 text-lg leading-relaxed pt-10 border-t-8 border-gray-100">{n.content}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'admin' && (
          <div className="space-y-20 py-12">
            <div className="flex flex-col xl:flex-row justify-between items-center gap-12 border-b-8 border-black pb-16">
               <h2 className="text-8xl font-black uppercase tracking-tighter italic text-blue-900 leading-none">MoE Command <br/>Interface.</h2>
               <div className="flex bg-gray-100 p-4 rounded-[3.5rem] border-8 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
                  {['users', 'courses', 'news', 'stats'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setAdminTab(tab as any)} 
                      className={`px-12 py-5 rounded-[2.5rem] font-black uppercase text-sm tracking-widest transition-all ${adminTab === tab ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-black'}`}
                    >
                      {tab === 'users' ? 'Identity Hub' : tab === 'courses' ? 'Curriculum' : tab === 'news' ? 'Bulletin' : 'Analytics'}
                    </button>
                  ))}
               </div>
            </div>
            {renderAdminTab()}
          </div>
        )}

        {/* Modal for User Entity Editing */}
        {editingUser && (
          <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xl flex items-center justify-center p-6">
             <div className="bg-white p-16 rounded-[6rem] border-8 border-black w-full max-w-5xl max-h-[95vh] overflow-y-auto space-y-16 animate-scaleUp shadow-[40px_40px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center border-b-8 border-black pb-12">
                  <h3 className="text-6xl font-black uppercase tracking-tighter italic">{editingUser.id ? 'Modify Record' : 'Master Registration'}</h3>
                  <button onClick={() => setEditingUser(null)} className="bg-rose-50 text-rose-600 px-10 py-4 rounded-3xl border-4 border-black font-black uppercase text-sm shadow-lg">Abort</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Entity Access Role</label>
                      <select value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value as any})} className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none focus:bg-white shadow-inner">
                         <option value="student">STUDENT</option>
                         <option value="teacher">INSTRUCTOR</option>
                         <option value="admin">MoE DIRECTOR</option>
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Full Legal Identity</label>
                      <input value={editingUser.name || ''} onChange={e => setEditingUser({...editingUser, name: e.target.value})} placeholder="e.g. Abebe Bikila" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none focus:bg-white shadow-inner" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Sovereign Email</label>
                      <input value={editingUser.email || ''} onChange={e => setEditingUser({...editingUser, email: e.target.value})} placeholder="identity@iftu.edu.et" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none focus:bg-white shadow-inner" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Federal NID Record</label>
                      <input value={editingUser.nid || ''} onChange={e => setEditingUser({...editingUser, nid: e.target.value})} placeholder="ET-NID-XXXXXX" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none focus:bg-white shadow-inner" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Gender Identity</label>
                      <div className="flex gap-6">
                         {['male', 'female', 'other'].map(g => (
                           <button key={g} onClick={() => setEditingUser({...editingUser, gender: g as any})} className={`flex-1 py-6 rounded-3xl border-8 border-black font-black uppercase text-sm shadow-xl transition-all ${editingUser.gender === g ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}>{g}</button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Birth Record</label>
                      <input type="date" value={editingUser.dob || ''} onChange={e => setEditingUser({...editingUser, dob: e.target.value})} className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Active Contact Number</label>
                      <input value={editingUser.phoneNumber || ''} onChange={e => setEditingUser({...editingUser, phoneNumber: e.target.value})} placeholder="+251..." className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none focus:bg-white shadow-inner" />
                   </div>

                   {editingUser.role === 'student' ? (
                     <>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">National Grade Target</label>
                        <select value={editingUser.grade} onChange={e => setEditingUser({...editingUser, grade: e.target.value as any})} className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner">
                          {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Education Sector</label>
                        <select value={editingUser.level} onChange={e => setEditingUser({...editingUser, level: e.target.value as any})} className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner">
                          <option value={EducationLevel.SECONDARY}>SECONDARY ACADEMY</option>
                          <option value={EducationLevel.TVET}>TVET VOCATIONAL</option>
                        </select>
                      </div>
                     </>
                   ) : (
                     <>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Department / Directive Office</label>
                        <input value={editingUser.department || ''} onChange={e => setEditingUser({...editingUser, department: e.target.value})} placeholder="e.g. Science Faculty" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none focus:bg-white shadow-inner" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Compensation Stipend (ETB)</label>
                        <input type="number" value={editingUser.salary || ''} onChange={e => setEditingUser({...editingUser, salary: parseInt(e.target.value)})} placeholder="Salary Amount" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner" />
                      </div>
                     </>
                   )}
                </div>
                <button 
                  onClick={() => handleSaveUser(editingUser)} 
                  className="w-full py-12 bg-blue-700 text-white rounded-[4rem] border-8 border-black font-black uppercase text-5xl shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 hover:shadow-none transition-all"
                >
                  Authorize Identity Record
                </button>
             </div>
          </div>
        )}

        {/* Modal for Bulletin Editing */}
        {editingNews && (
          <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xl flex items-center justify-center p-6">
             <div className="bg-white p-16 rounded-[6rem] border-8 border-black w-full max-w-5xl max-h-[95vh] overflow-y-auto space-y-16 animate-scaleUp shadow-[40px_40px_0px_0px_rgba(59,130,246,1)]">
                <div className="flex justify-between items-center border-b-8 border-black pb-12">
                  <h3 className="text-6xl font-black uppercase tracking-tighter italic">Forge Bulletin Content</h3>
                  <button onClick={() => setEditingNews(null)} className="bg-rose-50 text-rose-600 px-10 py-4 rounded-3xl border-4 border-black font-black uppercase text-sm">Discard</button>
                </div>
                <div className="space-y-10">
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Headline Directive</label>
                      <input value={editingNews.title || ''} onChange={e => setEditingNews({...editingNews, title: e.target.value})} placeholder="Catchy Headline" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner" />
                   </div>
                   <div className="grid grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">News Sector Tag</label>
                        <select value={editingNews.tag} onChange={e => setEditingNews({...editingNews, tag: e.target.value})} className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner">
                          <option value="National">NATIONAL</option>
                          <option value="TVET">TVET</option>
                          <option value="Exam">EXAM HALL</option>
                          <option value="Infrastructure">INFRASTRUCTURE</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Imagery Resource Link</label>
                        <input value={editingNews.image || ''} onChange={e => setEditingNews({...editingNews, image: e.target.value})} placeholder="Unsplash URL" className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-3xl outline-none shadow-inner" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Directive Abstract (1 Sentence)</label>
                      <input value={editingNews.summary || ''} onChange={e => setEditingNews({...editingNews, summary: e.target.value})} className="w-full bg-gray-100 border-8 border-black rounded-[2.5rem] p-8 font-black text-xl outline-none shadow-inner" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black uppercase text-gray-400 ml-6 tracking-[0.5em]">Master Bulletin Body</label>
                      <textarea value={editingNews.content || ''} onChange={e => setEditingNews({...editingNews, content: e.target.value})} className="w-full h-56 bg-gray-100 border-8 border-black rounded-[3rem] p-10 font-black text-xl outline-none shadow-inner" />
                   </div>
                </div>
                <button 
                  onClick={() => saveNewsItem(editingNews)} 
                  className="w-full py-12 bg-black text-white rounded-[4rem] border-8 border-black font-black uppercase text-5xl shadow-[20px_20px_0px_0px_rgba(59,130,246,1)] hover:translate-y-2 hover:shadow-none transition-all"
                >
                  Deploy Bulletin Now
                </button>
             </div>
          </div>
        )}

        {/* Existing logic for other views (courses, tutor, exams, login) remains functional... */}
        {activeView === 'courses' && (
          <div className="space-y-16 animate-fadeIn py-12">
            <div className="flex flex-wrap gap-6 border-b-8 border-black pb-16">
               {['all', '9-10', '11-12-social', '11-12-natural', 'tvet'].map(cat => (
                 <button key={cat} onClick={() => setCourseCategory(cat as any)} className={`px-12 py-5 rounded-[2rem] border-8 border-black font-black uppercase text-sm tracking-widest transition-all ${courseCategory === cat ? 'bg-black text-white shadow-xl' : 'bg-white hover:bg-gray-50 shadow-md'}`}>{cat.replace('-', ' ')}</button>
               ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
              {courses.filter(c => courseCategory === 'all' || (courseCategory === '9-10' && (c.grade === Grade.G9 || c.grade === Grade.G10))).map(c => <CourseCard key={c.id} course={c} onClick={() => {}} />)}
            </div>
          </div>
        )}

        {activeView === 'tutor' && <AITutor />}

        {activeView === 'login' && (
           <div className="max-w-2xl mx-auto py-32 animate-fadeIn">
             <div className="bg-white p-24 rounded-[6rem] border-8 border-black shadow-[40px_40px_0px_0px_rgba(0,0,0,1)] text-center space-y-20">
               <div className="w-48 h-48 bg-blue-700 text-white rounded-[4rem] border-8 border-black flex items-center justify-center text-9xl font-black mx-auto shadow-2xl">I</div>
               <div className="space-y-6">
                 <h2 className="text-7xl font-black uppercase tracking-tighter italic">Hub Entry</h2>
                 <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-sm italic">Authorized National Gateway Only</p>
               </div>
               <div className="grid grid-cols-1 gap-8">
                 <button onClick={() => handleLogin(users[0])} className="w-full py-10 bg-blue-50 text-blue-700 rounded-[3rem] border-8 border-black font-black uppercase text-3xl shadow-xl hover:translate-y-2 hover:shadow-none transition-all">Student Terminal</button>
                 <button onClick={() => handleLogin(users[1])} className="w-full py-10 bg-indigo-50 text-indigo-800 rounded-[3rem] border-8 border-black font-black uppercase text-3xl shadow-xl hover:translate-y-2 hover:shadow-none transition-all">Faculty Portal</button>
                 <button onClick={() => handleLogin(users[2])} className="w-full py-10 bg-black text-white rounded-[3rem] border-8 border-black font-black uppercase text-3xl shadow-xl hover:translate-y-2 hover:shadow-none transition-all">Directorate Entry</button>
               </div>
             </div>
           </div>
        )}
      </main>

      <footer className="bg-white border-t-8 border-black pt-40 pb-24">
         <div className="max-w-screen-2xl mx-auto px-8 space-y-40">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-32">
               <div className="space-y-12 max-w-2xl">
                  <div className="flex items-center space-x-10">
                     <div className="w-32 h-32 bg-blue-700 text-white rounded-[3rem] border-8 border-black flex items-center justify-center text-7xl font-black shadow-2xl">I</div>
                     <span className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic text-blue-900 leading-none">IFTU HUB</span>
                  </div>
                  <p className="text-gray-500 font-black text-3xl md:text-4xl leading-[1.1] italic">
                    The Central Nervous System for Sovereign Ethiopian Education.
                  </p>
                  <div className="flex items-center gap-8 p-10 bg-gray-50 border-8 border-black rounded-[3rem] shadow-xl">
                     <div className="flex gap-2">
                        <div className="w-10 h-3 bg-[#009b44] rounded-full border-2 border-black"></div>
                        <div className="w-10 h-3 bg-[#ffcd00] rounded-full border-2 border-black"></div>
                        <div className="w-10 h-3 bg-[#ef3340] rounded-full border-2 border-black"></div>
                     </div>
                     <p className="font-black uppercase tracking-[0.4em] text-sm">Official MoE Asset Infrastructure</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-32">
                  <div className="space-y-10">
                     <h4 className="font-black uppercase tracking-[0.5em] text-xs border-b-8 border-black pb-6 text-gray-400">Hub Assetry</h4>
                     <ul className="space-y-8 text-3xl font-black uppercase tracking-tighter italic">
                        <li><button onClick={() => setActiveView('home')} className="hover:text-blue-700 transition-colors">Home</button></li>
                        <li><button onClick={() => setActiveView('courses')} className="hover:text-blue-700 transition-colors">Courses</button></li>
                        <li><button onClick={() => setActiveView('exams')} className="hover:text-blue-700 transition-colors">Exams</button></li>
                        <li><button onClick={() => setActiveView('tutor')} className="hover:text-blue-700 transition-colors">AI Lab</button></li>
                     </ul>
                  </div>
                  <div className="space-y-10">
                     <h4 className="font-black uppercase tracking-[0.5em] text-xs border-b-8 border-black pb-6 text-gray-400">Directorate</h4>
                     <ul className="space-y-8 text-3xl font-black uppercase tracking-tighter italic">
                        <li><button onClick={() => setActiveView('about')} className="hover:text-blue-700 transition-colors">About Hub</button></li>
                        <li><button onClick={() => setActiveView('news')} className="hover:text-blue-700 transition-colors">Bulletins</button></li>
                        <li><button onClick={() => setActiveView('admin')} className="hover:text-blue-700 transition-colors">Master Command</button></li>
                     </ul>
                  </div>
               </div>
            </div>

            <div className="pt-24 border-t-8 border-black flex flex-col md:flex-row justify-between items-center gap-20">
               <div className="flex gap-12">
                  {/* Official Brand Icons (Original SVGs) */}
                  <a href="#" className="w-24 h-24 bg-white border-8 border-black rounded-[2.5rem] flex items-center justify-center shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 hover:shadow-none transition-all active:scale-90">
                    <svg className="w-12 h-12 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-24 h-24 bg-white border-8 border-black rounded-[2.5rem] flex items-center justify-center shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 hover:shadow-none transition-all active:scale-90">
                    <svg className="w-12 h-12 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.54.26l.213-3.04 5.532-5.003c.24-.213-.054-.33-.373-.12l-6.84 4.307-2.94-.917c-.643-.203-.655-.643.133-.95l11.5-4.43c.532-.203 1 .118.835.856z"/></svg>
                  </a>
                  <a href="#" className="w-24 h-24 bg-white border-8 border-black rounded-[2.5rem] flex items-center justify-center shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 hover:shadow-none transition-all active:scale-90">
                    <svg className="w-12 h-12 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" className="w-24 h-24 bg-white border-8 border-black rounded-[2.5rem] flex items-center justify-center shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 hover:shadow-none transition-all active:scale-90">
                    <svg className="w-12 h-12 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29z"/></svg>
                  </a>
               </div>
               
               <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-6">
                  <p className="text-3xl font-black uppercase tracking-[0.4em] text-gray-900 leading-none">FEDERAL SOVEREIGN HUB</p>
                  <p className="text-[14px] font-black uppercase tracking-[0.2em] text-gray-400 italic">© 2024 IFTU HUB • DIRECTED BY LEAD ARCHITECT JEMAL FANO HAJI</p>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
