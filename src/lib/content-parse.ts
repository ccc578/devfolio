import type {
  Availability,
  AvailabilityStatus,
  ContentOverrideParseResult,
  ProfileOverride,
  Project,
  ProjectStatus,
  SiteOverride,
  Skill,
  SkillGroup,
  SkillLevel,
  SocialLink,
  TimelineItem,
} from '../types';


const STATUSES: readonly AvailabilityStatus[] = ['open', 'freelance', 'closed'];
const SKILL_LEVELS: readonly SkillLevel[] = ['expert', 'advanced', 'proficient', 'learning'];
const PROJECT_STATUSES: readonly ProjectStatus[] = ['live', 'maintained', 'archived', 'wip'];

export const MAX_HEADLINE = 8;
export const MAX_BIO = 12;
export const MAX_SOCIALS = 8;
export const MAX_SKILL_GROUPS = 8;
export const MAX_SKILLS_PER_GROUP = 20;
export const MAX_PROJECTS = 30;
export const MAX_EXPERIENCES = 20;
export const MAX_HIGHLIGHTS = 10;
export const MAX_TAGS = 10;

const MIN_YEAR = 1990;
const URL_PATTERN = /^(https?:\/\/|mailto:|\/)/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function fail<T>(error: string): Result<T> {
  return { ok: false, error };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseText(value: unknown, field: string, max: number): Result<string> {
  if (typeof value !== 'string') return fail(`${field} 必须是字符串`);
  const trimmed = value.trim();
  if (trimmed === '') return fail(`${field} 不能为空`);
  if (trimmed.length > max) return fail(`${field} 超过 ${max} 个字符`);
  return { ok: true, value: trimmed };
}

function parseOptionalText(
  value: unknown,
  field: string,
  max: number,
): Result<string | undefined> {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (typeof value !== 'string') return fail(`${field} 必须是字符串`);
  const trimmed = value.trim();
  if (trimmed === '') return { ok: true, value: undefined };
  if (trimmed.length > max) return fail(`${field} 超过 ${max} 个字符`);
  return { ok: true, value: trimmed };
}

function parseTextList(
  value: unknown,
  field: string,
  maxItems: number,
  maxLength: number,
): Result<string[]> {
  if (!Array.isArray(value)) return fail(`${field} 必须是数组`);
  if (value.length === 0) return fail(`${field} 至少需要一项`);
  if (value.length > maxItems) return fail(`${field} 最多 ${maxItems} 项`);

  const items: string[] = [];
  for (const item of value) {
    const parsed = parseText(item, field, maxLength);
    if (!parsed.ok) return parsed;
    items.push(parsed.value);
  }
  return { ok: true, value: items };
}

function parseOptionalTextList(
  value: unknown,
  field: string,
  maxItems: number,
  maxLength: number,
): Result<string[] | undefined> {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (!Array.isArray(value)) return fail(`${field} 必须是数组`);
  if (value.length === 0) return { ok: true, value: undefined };
  const parsed = parseTextList(value, field, maxItems, maxLength);
  return parsed.ok ? { ok: true, value: parsed.value } : parsed;
}

function parseInteger(value: unknown, field: string, min: number, max: number): Result<number> {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return fail(`${field} 必须是整数`);
  }
  if (value < min || value > max) return fail(`${field} 需在 ${min} 到 ${max} 之间`);
  return { ok: true, value };
}

function parseEnum<T extends string>(
  value: unknown,
  field: string,
  allowed: readonly T[],
): Result<T> {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    return fail(`${field} 取值必须是 ${allowed.join(' / ')}`);
  }
  return { ok: true, value: value as T };
}

function parseUrl(value: unknown, field: string, max: number): Result<string> {
  const parsed = parseText(value, field, max);
  if (!parsed.ok) return parsed;
  if (!URL_PATTERN.test(parsed.value)) {
    return fail(`${field} 需以 http(s)://、mailto: 或 / 开头`);
  }
  return parsed;
}

function parseMonth(value: unknown, field: string): Result<string> {
  const parsed = parseText(value, field, 7);
  if (!parsed.ok) return parsed;
  if (!MONTH_PATTERN.test(parsed.value)) return fail(`${field} 格式需为 YYYY-MM`);
  return parsed;
}

function parseAvailability(value: unknown): Result<Availability> {
  if (!isRecord(value)) return fail('求职状态必须是对象');

  const status = parseEnum<AvailabilityStatus>(value.status, '求职状态', STATUSES);
  if (!status.ok) return status;

  const text = parseText(value.text, '求职状态文案', 40);
  if (!text.ok) return text;

  return { ok: true, value: { status: status.value, text: text.value } };
}

function parseSocial(value: unknown, index: number): Result<SocialLink> {
  const at = `社交链接 ${index + 1}`;
  if (!isRecord(value)) return fail(`${at} 必须是对象`);

  const id = parseText(value.id, `${at} 的 id`, 40);
  if (!id.ok) return id;

  const label = parseText(value.label, `${at} 的名称`, 20);
  if (!label.ok) return label;

  const url = parseUrl(value.url, `${at} 的链接`, 200);
  if (!url.ok) return url;

  const icon = parseText(value.icon, `${at} 的图标`, 30);
  if (!icon.ok) return icon;

  const handle = parseOptionalText(value.handle, `${at} 的账号`, 40);
  if (!handle.ok) return handle;

  return {
    ok: true,
    value: {
      id: id.value,
      label: label.value,
      url: url.value,
      icon: icon.value,
      ...(handle.value === undefined ? {} : { handle: handle.value }),
    },
  };
}

function parseProfileOverride(value: unknown): Result<ProfileOverride> {
  if (!isRecord(value)) return fail('profile 必须是对象');

  const name = parseText(value.name, '姓名', 30);
  if (!name.ok) return name;

  const role = parseText(value.role, '职位', 40);
  if (!role.ok) return role;

  const headline = parseTextList(value.headline, '技能标签', MAX_HEADLINE, 40);
  if (!headline.ok) return headline;

  const slogan = parseText(value.slogan, 'Slogan', 60);
  if (!slogan.ok) return slogan;

  const avatar = parseText(value.avatar, '头像路径', 200);
  if (!avatar.ok) return avatar;

  const avatarAlt = parseText(value.avatarAlt, '头像替代文本', 60);
  if (!avatarAlt.ok) return avatarAlt;

  const location = parseText(value.location, '所在城市', 30);
  if (!location.ok) return location;

  const email = parseText(value.email, '邮箱', 80);
  if (!email.ok) return email;
  if (!EMAIL_PATTERN.test(email.value)) return fail('邮箱格式不正确');

  const resumeUrl = parseText(value.resumeUrl, '简历路径', 200);
  if (!resumeUrl.ok) return resumeUrl;

  const bio = parseTextList(value.bio, '个人简介', MAX_BIO, 600);
  if (!bio.ok) return bio;

  const availability = parseAvailability(value.availability);
  if (!availability.ok) return availability;

  if (!Array.isArray(value.socials)) return fail('社交链接必须是数组');
  if (value.socials.length > MAX_SOCIALS) return fail(`社交链接最多 ${MAX_SOCIALS} 个`);

  const socials: SocialLink[] = [];
  for (const [index, item] of value.socials.entries()) {
    const parsed = parseSocial(item, index);
    if (!parsed.ok) return parsed;
    if (socials.some((link) => link.id === parsed.value.id)) {
      return fail(`社交链接 id 重复：${parsed.value.id}`);
    }
    socials.push(parsed.value);
  }

  return {
    ok: true,
    value: {
      name: name.value,
      role: role.value,
      headline: headline.value,
      slogan: slogan.value,
      avatar: avatar.value,
      avatarAlt: avatarAlt.value,
      location: location.value,
      email: email.value,
      resumeUrl: resumeUrl.value,
      bio: bio.value,
      availability: availability.value,
      socials,
    },
  };
}

function parseSiteOverride(value: unknown): Result<SiteOverride> {
  if (!isRecord(value)) return fail('site 必须是对象');

  const title = parseText(value.title, '站点标题', 60);
  if (!title.ok) return title;

  const description = parseText(value.description, '站点描述', 160);
  if (!description.ok) return description;

  const author = parseText(value.author, '作者名', 30);
  if (!author.ok) return author;

  if (!isRecord(value.footer)) return fail('页脚配置必须是对象');

  const { since, note } = value.footer;
  const currentYear = new Date().getFullYear();
  const parsedSince = parseInteger(since, '页脚起始年份', MIN_YEAR, currentYear);
  if (!parsedSince.ok) return parsedSince;

  const noteText = parseText(note, '页脚备注', 120);
  if (!noteText.ok) return noteText;

  return {
    ok: true,
    value: {
      title: title.value,
      description: description.value,
      author: author.value,
      footer: { since: parsedSince.value, note: noteText.value },
    },
  };
}

function parseSkill(value: unknown, at: string): Result<Skill> {
  if (!isRecord(value)) return fail(`${at} 必须是对象`);

  const name = parseText(value.name, `${at}名称`, 40);
  if (!name.ok) return name;

  const level = parseEnum<SkillLevel>(value.level, `${at}熟练度`, SKILL_LEVELS);
  if (!level.ok) return level;

  let years: number | undefined;
  if (value.years !== undefined && value.years !== null) {
    const parsed = parseInteger(value.years, `${at}年限`, 0, 60);
    if (!parsed.ok) return parsed;
    years = parsed.value;
  }

  return {
    ok: true,
    value: {
      name: name.value,
      level: level.value,
      ...(years === undefined ? {} : { years }),
    },
  };
}

function parseSkillGroups(value: unknown): Result<SkillGroup[]> {
  if (!Array.isArray(value)) return fail('技能分组必须是数组');
  if (value.length === 0) return fail('至少需要一个技能分组');
  if (value.length > MAX_SKILL_GROUPS) return fail(`技能分组最多 ${MAX_SKILL_GROUPS} 个`);

  const groups: SkillGroup[] = [];
  for (const [index, item] of value.entries()) {
    const at = `技能分组 ${index + 1}`;
    if (!isRecord(item)) return fail(`${at} 必须是对象`);

    const id = parseText(item.id, `${at} 的 id`, 40);
    if (!id.ok) return id;
    if (groups.some((group) => group.id === id.value)) return fail(`技能分组 id 重复：${id.value}`);

    const title = parseText(item.title, `${at} 的标题`, 40);
    if (!title.ok) return title;

    const description = parseOptionalText(item.description, `${at} 的描述`, 120);
    if (!description.ok) return description;

    if (!Array.isArray(item.skills)) return fail(`${at} 的 skills 必须是数组`);
    if (item.skills.length === 0) return fail(`${at} 至少需要一项技能`);
    if (item.skills.length > MAX_SKILLS_PER_GROUP) {
      return fail(`${at} 最多 ${MAX_SKILLS_PER_GROUP} 项技能`);
    }

    const skills: Skill[] = [];
    for (const [skillIndex, skill] of item.skills.entries()) {
      const parsed = parseSkill(skill, `${at} 第 ${skillIndex + 1} 项技能`);
      if (!parsed.ok) return parsed;
      skills.push(parsed.value);
    }

    groups.push({
      id: id.value,
      title: title.value,
      ...(description.value === undefined ? {} : { description: description.value }),
      skills,
    });
  }

  return { ok: true, value: groups };
}

function parseExperience(value: unknown, index: number): Result<TimelineItem> {
  const at = `经历 ${index + 1}`;
  if (!isRecord(value)) return fail(`${at} 必须是对象`);

  const id = parseText(value.id, `${at} 的 id`, 40);
  if (!id.ok) return id;

  const type = parseEnum(value.type, `${at} 的类型`, ['work', 'education'] as const);
  if (!type.ok) return type;

  const title = parseText(value.title, `${at} 的标题`, 40);
  if (!title.ok) return title;

  const org = parseText(value.org, `${at} 的组织`, 60);
  if (!org.ok) return org;

  const start = parseMonth(value.start, `${at} 的开始时间`);
  if (!start.ok) return start;

  if (typeof value.end !== 'string') return fail(`${at} 的结束时间必须是字符串`);
  const end = value.end.trim();
  if (end !== 'present' && !MONTH_PATTERN.test(end)) {
    return fail(`${at} 的结束时间需为 YYYY-MM 或 present`);
  }
  if (end !== 'present' && end < start.value) {
    return fail(`${at} 的结束时间不能早于开始时间`);
  }

  const location = parseOptionalText(value.location, `${at} 的地点`, 40);
  if (!location.ok) return location;

  const summary = parseOptionalText(value.summary, `${at} 的简介`, 300);
  if (!summary.ok) return summary;

  const highlights = parseOptionalTextList(value.highlights, `${at} 的亮点`, MAX_HIGHLIGHTS, 300);
  if (!highlights.ok) return highlights;

  const tags = parseOptionalTextList(value.tags, `${at} 的标签`, MAX_TAGS, 30);
  if (!tags.ok) return tags;

  return {
    ok: true,
    value: {
      id: id.value,
      type: type.value,
      title: title.value,
      org: org.value,
      start: start.value,
      end,
      ...(location.value === undefined ? {} : { location: location.value }),
      ...(summary.value === undefined ? {} : { summary: summary.value }),
      ...(highlights.value === undefined ? {} : { highlights: highlights.value }),
      ...(tags.value === undefined ? {} : { tags: tags.value }),
    },
  };
}

function parseExperiences(value: unknown): Result<TimelineItem[]> {
  if (!Array.isArray(value)) return fail('经历必须是数组');
  if (value.length === 0) return fail('至少需要一条经历');
  if (value.length > MAX_EXPERIENCES) return fail(`经历最多 ${MAX_EXPERIENCES} 条`);

  const items: TimelineItem[] = [];
  for (const [index, item] of value.entries()) {
    const parsed = parseExperience(item, index);
    if (!parsed.ok) return parsed;
    if (items.some((existing) => existing.id === parsed.value.id)) {
      return fail(`经历 id 重复：${parsed.value.id}`);
    }
    items.push(parsed.value);
  }
  return { ok: true, value: items };
}

function parseProject(value: unknown, index: number): Result<Project> {
  const at = `项目 ${index + 1}`;
  if (!isRecord(value)) return fail(`${at} 必须是对象`);

  const slug = parseText(value.slug, `${at} 的 slug`, 60);
  if (!slug.ok) return slug;
  if (!SLUG_PATTERN.test(slug.value)) {
    return fail(`${at} 的 slug 只能包含小写字母、数字与连字符`);
  }

  const title = parseText(value.title, `${at} 的标题`, 60);
  if (!title.ok) return title;

  const summary = parseText(value.summary, `${at} 的摘要`, 160);
  if (!summary.ok) return summary;

  const description = parseText(value.description, `${at} 的正文`, 10000);
  if (!description.ok) return description;

  const cover = parseText(value.cover, `${at} 的封面`, 200);
  if (!cover.ok) return cover;

  const coverAlt = parseText(value.coverAlt, `${at} 的封面替代文本`, 120);
  if (!coverAlt.ok) return coverAlt;

  const stack = parseTextList(value.stack, `${at} 的技术栈`, 12, 30);
  if (!stack.ok) return stack;

  const role = parseOptionalText(value.role, `${at} 的角色`, 60);
  if (!role.ok) return role;

  const period = parseOptionalText(value.period, `${at} 的周期`, 60);
  if (!period.ok) return period;

  const highlights = parseOptionalTextList(value.highlights, `${at} 的亮点`, MAX_HIGHLIGHTS, 300);
  if (!highlights.ok) return highlights;

  if (value.links !== undefined && !isRecord(value.links)) {
    return fail(`${at} 的 links 必须是对象`);
  }
  const rawLinks = isRecord(value.links) ? value.links : {};
  const links: Project['links'] = {};
  for (const key of ['github', 'demo', 'article'] as const) {
    const raw = rawLinks[key];
    if (raw === undefined || raw === null || raw === '') continue;
    const parsed = parseUrl(raw, `${at} 的 ${key} 链接`, 200);
    if (!parsed.ok) return parsed;
    links[key] = parsed.value;
  }

  if (typeof value.featured !== 'boolean') return fail(`${at} 的 featured 必须是布尔值`);
  const status = parseEnum<ProjectStatus>(value.status, `${at} 的状态`, PROJECT_STATUSES);
  if (!status.ok) return status;

  const order = parseInteger(value.order, `${at} 的排序`, 0, 9999);
  if (!order.ok) return order;

  return {
    ok: true,
    value: {
      slug: slug.value,
      title: title.value,
      summary: summary.value,
      description: description.value,
      cover: cover.value,
      coverAlt: coverAlt.value,
      stack: stack.value,
      ...(role.value === undefined ? {} : { role: role.value }),
      ...(period.value === undefined ? {} : { period: period.value }),
      ...(highlights.value === undefined ? {} : { highlights: highlights.value }),
      links,
      featured: value.featured,
      status: status.value,
      order: order.value,
    },
  };
}

function parseProjects(value: unknown): Result<Project[]> {
  if (!Array.isArray(value)) return fail('项目必须是数组');
  if (value.length === 0) return fail('至少需要一个项目');
  if (value.length > MAX_PROJECTS) return fail(`项目最多 ${MAX_PROJECTS} 个`);

  const items: Project[] = [];
  for (const [index, item] of value.entries()) {
    const parsed = parseProject(item, index);
    if (!parsed.ok) return parsed;
    if (items.some((project) => project.slug === parsed.value.slug)) {
      return fail(`项目 slug 重复：${parsed.value.slug}`);
    }
    items.push(parsed.value);
  }
  return { ok: true, value: items };
}

/** 逐字段收窄外部数据（localStorage / 导入的 JSON），不直接断言。 */
export function parseContentOverride(raw: unknown): ContentOverrideParseResult {
  if (!isRecord(raw)) return { ok: false, error: '配置必须是 JSON 对象' };

  const profileResult = parseProfileOverride(raw.profile);
  if (!profileResult.ok) return profileResult;

  const siteResult = parseSiteOverride(raw.site);
  if (!siteResult.ok) return siteResult;

  const skillsResult = parseSkillGroups(raw.skills);
  if (!skillsResult.ok) return skillsResult;

  const experiencesResult = parseExperiences(raw.experiences);
  if (!experiencesResult.ok) return experiencesResult;

  const projectsResult = parseProjects(raw.projects);
  if (!projectsResult.ok) return projectsResult;

  return {
    ok: true,
    value: {
      version: 2,
      updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : new Date().toISOString(),
      profile: profileResult.value,
      site: siteResult.value,
      skills: skillsResult.value,
      experiences: experiencesResult.value,
      projects: projectsResult.value,
    },
  };
}
