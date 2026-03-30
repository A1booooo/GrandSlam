import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export const i18n = {
  en: {
    navDaily: 'Daily', navWeekly: 'Weekly', navGrid: 'Grid', navPWA: 'PWA',
    titleSchedule: 'SCHEDULE', titleWeekly: 'WEEKLY MASTER', titleAchievements: 'ACHIEVEMENTS', titleSettings: 'SYSTEM PREFERENCES',
    status: 'Status', grandSlam: 'Grand Slam', active: 'Active', completion: 'Completion',
    syncTemplate: 'Sync Template', pullTemplate: 'Pull from Weekly Master',
    createManual: 'Create Manual Task',
    weeklyDesc: 'Define standard operations for each day. These blueprints can be synchronized to your daily schedule instantly.',
    syncToToday: 'Sync to Today', blueprint: 'Blueprint', noOps: 'No standard operations defined',
    addBlueprint: 'Add Blueprint Block',
    slams30: '30-Day Slams', currentStreak: 'Current Streak', heatmap: 'Heatmap (Last 30 Days)',
    install: 'Installation', addWorkspace: 'Add to Workspace',
    iosStep1: "Tap the 'Share' icon in the Safari toolbar.",
    iosStep2: "Scroll and select 'Add to Home Screen'.",
    androidStep1: "Tap the menu icon (three dots) in Chrome.",
    androidStep2: "Select 'Install App' or 'Add to Home Screen'.",
    visitMsg: 'Please visit this app on iOS Safari or Android Chrome to install as a PWA desktop application.',
    logout: 'Logout / Terminate Session', language: 'Language Switch', langLabel: 'Switch between EN / ZH',
    taskIdentity: 'Task Identity', startBlock: 'Start Block', endBlock: 'End Block',
    terminate: 'Terminate Task', cancel: 'Cancel', save: 'Save', newTask: 'New Task', editTask: 'Edit Task',
    opStatus: 'Operational Status', completed100: '100% Completed',
    
    // Auth Strings
    systemAccess: 'SYSTEM_ACCESS',
    idRequired: 'IDENTIFICATION REQUIRED / TERMINAL 04-A',
    userIdentifier: 'USER_IDENTIFIER',
    securePhrase: 'SECURE_PHRASE',
    authorize: 'AUTHORIZE',
    createAccount: 'CREATE_ACCOUNT',
    authError: 'AUTHENTICATION_FAILURE',
    emailPlaceholder: 'EMAIL@SYSTEM.COM',
    signIn: 'SIGN_IN'
  },
  zh: {
    navDaily: '日程', navWeekly: '周模板', navGrid: '成就', navPWA: '设置',
    titleSchedule: '今日日程', titleWeekly: '周模板配置', titleAchievements: '成就统计', titleSettings: '系统设置',
    status: '当前状态', grandSlam: '全满贯', active: '进行中', completion: '完成进度',
    syncTemplate: '同步周模板', pullTemplate: '从周模板导入今日任务',
    createManual: '手动创建任务',
    weeklyDesc: '定义每天的标准工作流。这些模板可以一键同步到你的每日日程中。',
    syncToToday: '同步至今日', blueprint: '标准工作流', noOps: '未定义标准工作流',
    addBlueprint: '添加工作流区块',
    slams30: '近30天满贯', currentStreak: '当前连续达标', heatmap: '活动热力图 (近30天)',
    install: '安装指南', addWorkspace: '添加至主屏幕 (PWA)',
    iosStep1: "点击 Safari 底部导航栏的「共享」图标。",
    iosStep2: "向上滑动并选择「添加到主屏幕」。",
    androidStep1: "点击 Chrome 浏览器右上角的菜单按钮 (三个点)。",
    androidStep2: "选择「安装应用」或「添加到主屏幕」。",
    visitMsg: '请在 iOS Safari 或 Android Chrome 浏览器中访问以安装为桌面级 PWA 应用。',
    logout: '退出登录与清空环境', language: '系统语言', langLabel: '在中英文之间切换',
    taskIdentity: '任务名称', startBlock: '开始时间', endBlock: '结束时间',
    terminate: '删除任务', cancel: '取消', save: '保存', newTask: '新建任务', editTask: '编辑任务',
    opStatus: '系统运行状态', completed100: '100% 已完成',

    // Auth Strings
    systemAccess: '系统接入许可',
    idRequired: '要求身份验证 / 终端许可 04-A',
    userIdentifier: '识别代码(邮箱)',
    securePhrase: '安全密钥(密码)',
    authorize: '授权执行',
    createAccount: '初始化新载体',
    authError: '执行失败: 凭证无效',
    emailPlaceholder: 'USER@SYSTEM.COM',
    signIn: '返回接入'
  }
};

export type Language = 'en' | 'zh';
export type ViewType = 'SCHEDULE' | 'WEEKLY' | 'ACHIEVEMENTS' | 'SETTINGS';

export interface Task {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: 'TODO' | 'COMPLETED';
  tags?: string[];
}

export interface Plan {
  date: string;
  isGrandSlam: boolean;
  tasks: Task[];
}

export interface WeeklyTemplate {
  id: string;
  days: Record<number, Task[]>;
}

export interface EditingTask {
  context: 'DAILY' | 'TEMPLATE';
  day?: number;
  task: Task;
}

export interface StoreState {
  language: Language;
  currentView: ViewType;
  currentDate: string;
  user: any;
  session: any;
  editingTask: EditingTask | null;
  showGrandSlamEffect: boolean;

  setLanguage: (lang: Language) => void;
  setView: (view: ViewType) => void;
  setUserSession: (user: any, session: any) => void;
  setEditingTask: (payload: EditingTask | null) => void;
  setShowGrandSlamEffect: (show: boolean) => void;

  plans: Record<string, Plan>;
  weeklyTemplate: WeeklyTemplate;

  toggleTaskStatus: (date: string, taskId: string) => void;
  addTask: (date: string, taskData: Partial<Task>) => void;
  updateTask: (date: string, updatedTask: Task) => void;
  deleteTask: (date: string, taskId: string) => void;

  addTemplateTask: (dayIndex: number, taskData: Partial<Task>) => void;
  updateTemplateTask: (dayIndex: number, updatedTask: Task) => void;
  deleteTemplateTask: (dayIndex: number, taskId: string) => void;
  syncWeeklyTemplate: (date: string) => void;

  loadFromCloud: () => Promise<void>;
  syncToCloud: () => Promise<void>;
}

const getTodayStr = () => new Date().toISOString().split('T')[0];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // UI 状态
      language: 'en',
      currentView: 'SCHEDULE', 
      user: null,
      session: null,
      currentDate: getTodayStr(),
      editingTask: null,
      showGrandSlamEffect: false,

      setLanguage: (lang) => set({ language: lang }),
      setView: (view) => set({ currentView: view }),
      setUserSession: (user, session) => set({ user, session }),
      setEditingTask: (payload) => set({ editingTask: payload }),
      setShowGrandSlamEffect: (show) => set({ showGrandSlamEffect: show }),

      // 核心数据状态
      plans: {},
      weeklyTemplate: {
        id: 'master',
        days: {
          0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
        }
      },

      loadFromCloud: async () => {
        const { user } = get();
        if (!user) return;
        const { data, error } = await supabase.from('user_data').select('plans, weeklyTemplate').eq('id', user.id).single();
        if (data && !error) {
          // If the cloud has data, we overwrite local data.
          // Fallback to local defaults if cloud object is somehow empty
          set({ 
             plans: data.plans || get().plans, 
             weeklyTemplate: data.weeklyTemplate || get().weeklyTemplate 
          });
        }
      },

      syncToCloud: async () => {
        const { user, plans, weeklyTemplate } = get();
        if (!user) return;
        // Upsert uses the user ID as Primary Key
        await supabase.from('user_data').upsert({ 
          id: user.id, 
          plans, 
          weeklyTemplate, 
          updated_at: new Date().toISOString() 
        });
      },

      // --- 每日任务 Actions ---
      toggleTaskStatus: (date, taskId) => {
        const state = get();
        const plan = state.plans[date] || { date, isGrandSlam: false, tasks: [] };
        let newlyCompletedAll = false;

        const updatedTasks: Task[] = plan.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED' };
          }
          return task;
        });

        const isGrandSlam = updatedTasks.length > 0 && updatedTasks.every(t => t.status === 'COMPLETED');
        
        if (isGrandSlam && !plan.isGrandSlam) {
          newlyCompletedAll = true;
        }

        set({
          plans: { ...state.plans, [date]: { ...plan, tasks: updatedTasks, isGrandSlam } },
          showGrandSlamEffect: newlyCompletedAll
        });

        if (newlyCompletedAll) {
          setTimeout(() => set({ showGrandSlamEffect: false }), 2500);
        }
      },

      addTask: (date, taskData) => set((state) => {
        const plan: Plan = state.plans[date] || { date, isGrandSlam: false, tasks: [] };
        const newTask = { 
          name: '', startTime: '12:00', endTime: '13:00', tags: [], ...taskData, 
          id: Date.now().toString(), status: 'TODO' 
        } as Task;
        const updatedTasks: Task[] = [...plan.tasks, newTask].sort((a, b) => a.startTime.localeCompare(b.startTime));
        const isGrandSlam = updatedTasks.length > 0 && updatedTasks.every(t => t.status === 'COMPLETED');
        return { plans: { ...state.plans, [date]: { ...plan, tasks: updatedTasks, isGrandSlam } }, editingTask: null };
      }),

      updateTask: (date, updatedTask) => set((state) => {
        const plan = state.plans[date];
        if (!plan) return state;
        const updatedTasks = plan.tasks.map(t => t.id === updatedTask.id ? updatedTask : t).sort((a, b) => a.startTime.localeCompare(b.startTime));
        const isGrandSlam = updatedTasks.length > 0 && updatedTasks.every(t => t.status === 'COMPLETED');
        return { plans: { ...state.plans, [date]: { ...plan, tasks: updatedTasks, isGrandSlam } }, editingTask: null };
      }),

      deleteTask: (date, taskId) => set((state) => {
        const plan = state.plans[date];
        if (!plan) return state;
        const updatedTasks = plan.tasks.filter(t => t.id !== taskId);
        const isGrandSlam = updatedTasks.length > 0 && updatedTasks.every(t => t.status === 'COMPLETED');
        return { plans: { ...state.plans, [date]: { ...plan, tasks: updatedTasks, isGrandSlam } }, editingTask: null };
      }),

      // --- 周模板 Actions ---
      addTemplateTask: (dayIndex, taskData) => set((state) => {
        const template = state.weeklyTemplate;
        const newTask: Task = { 
          name: '', startTime: '09:00', endTime: '10:00', status: 'TODO', tags: ['TEMPLATE'], ...taskData, 
          id: Date.now().toString() 
        };
        const updatedDays = { 
          ...template.days, 
          [dayIndex]: [...(template.days[dayIndex] || []), newTask].sort((a, b) => a.startTime.localeCompare(b.startTime)) 
        };
        return { weeklyTemplate: { ...template, days: updatedDays }, editingTask: null };
      }),

      updateTemplateTask: (dayIndex, updatedTask) => set((state) => {
        const template = state.weeklyTemplate;
        const tasks = template.days[dayIndex] || [];
        const updatedTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t).sort((a, b) => a.startTime.localeCompare(b.startTime));
        return { weeklyTemplate: { ...template, days: { ...template.days, [dayIndex]: updatedTasks } }, editingTask: null };
      }),

      deleteTemplateTask: (dayIndex, taskId) => set((state) => {
        const template = state.weeklyTemplate;
        const tasks = template.days[dayIndex] || [];
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        return { weeklyTemplate: { ...template, days: { ...template.days, [dayIndex]: updatedTasks } }, editingTask: null };
      }),

      syncWeeklyTemplate: (date) => set((state) => {
        const dayOfWeek = new Date(date).getDay();
        const templateTasks = state.weeklyTemplate.days[dayOfWeek] || [];
        if (templateTasks.length === 0) return state;

        const plan = state.plans[date] || { date, isGrandSlam: false, tasks: [] };
        
        const newTasks: Task[] = templateTasks.map((t, idx) => ({ ...t, id: `${Date.now()}_${idx}`, status: 'TODO' }));
        const mergedTasks = [...plan.tasks, ...newTasks].sort((a, b) => a.startTime.localeCompare(b.startTime));
        const isGrandSlam = mergedTasks.length > 0 && mergedTasks.every(t => t.status === 'COMPLETED');

        return { plans: { ...state.plans, [date]: { ...plan, tasks: mergedTasks, isGrandSlam } } };
      })

    }),
    { 
      name: 'planner-pwa-storage',
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => !['currentDate', 'editingTask', 'showGrandSlamEffect'].includes(key))
      ),
    }
  )
);
