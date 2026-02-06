import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";

const renderStarContent = (detail) => {
  if (Array.isArray(detail)) {
    return (
      <div className="mt-2 space-y-2">
        {detail.map((item, index) => (
          <div key={`${index}-${item}`} className="flex gap-3">
            <span className="mt-2 h-1 w-1 rounded-full bg-emerald-300" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    );
  }
  return <p>{detail}</p>;
};

const getContentWeight = (detail) => {
  if (!detail) return 0;
  if (Array.isArray(detail)) {
    return detail.reduce((total, item) => total + String(item).length, 0);
  }
  return String(detail).length;
};

export default function ProjectStarSection({ projects }) {
  return (
    <MotionWrap>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Deep Dives"
          title="Project Architecture (S.T.A.R.)"
          description="Live infrastructure diagrams and structured outcomes."
        />
      </div>
      <div className="mt-6 grid gap-8">
        {projects.map((project) => {
          const leftWeight =
            getContentWeight(project.situation) + getContentWeight(project.task);
          const rightWeight =
            getContentWeight(project.action) + getContentWeight(project.result);
          const useSplitResult = rightWeight > leftWeight * 1.35;

          return (
            <Card key={project.name} className="grid gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-slate-100">
                  {project.name}
                </h3>
                <Badge variant="subtle">{project.tagline}</Badge>
              </div>
              {useSplitResult ? (
                <div className="mt-4 grid gap-6 text-sm text-slate-300 2xl:grid-cols-2 2xl:gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Situation
                      </p>
                      {renderStarContent(project.situation)}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Task
                      </p>
                      {renderStarContent(project.task)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Action
                      </p>
                      {renderStarContent(project.action)}
                    </div>
                  </div>
                  <div className="space-y-4 2xl:col-span-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Result
                      </p>
                      {renderStarContent(project.result)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 grid gap-6 text-sm text-slate-300 2xl:grid-cols-2 2xl:gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Situation
                      </p>
                      {renderStarContent(project.situation)}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Task
                      </p>
                      {renderStarContent(project.task)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Action
                      </p>
                      {renderStarContent(project.action)}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Result
                      </p>
                      {renderStarContent(project.result)}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
          );
        })}
      </div>
    </MotionWrap>
  );
}
