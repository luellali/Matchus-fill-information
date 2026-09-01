import { Heart, MapPin, X } from "lucide-react";

import { PageFrame } from "@/components/portfolio/page-frame";
import { ProfileNudge } from "@/components/portfolio/profile-nudge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function DiscoverScreen({ onNext }: { onNext: () => void }) {
  return (
    <PageFrame className="animate-screen-in">
      <div className="relative flex min-h-0 flex-1 flex-col px-[var(--page-inline)] pb-5">
        <Card className="relative mt-1 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border-white/80 bg-white">
          <div className="relative min-h-[48%] overflow-hidden bg-[#1e1731]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,#f4bed8_0,transparent_23%),radial-gradient(circle_at_52%_40%,#bda8ff_0,transparent_31%),linear-gradient(145deg,#171225_10%,#664f7f_48%,#df8eab_100%)]" />
            <div className="absolute -bottom-16 left-1/2 h-72 w-52 -translate-x-1/2 rotate-[-7deg] rounded-[48%_48%_20%_20%] bg-[linear-gradient(160deg,#312840,#987faf_48%,#d7b4c1)] shadow-2xl" />
            <div className="absolute bottom-8 left-6 max-w-[72%] text-white">
              <Badge className="mb-2 border-white/20 bg-black/25 text-white backdrop-blur">今日推荐</Badge>
              <h1 className="text-[22px] font-semibold tracking-[-0.03em]">无尽夏</h1>
              <p className="mt-1 text-xs text-white/72">安静 · 独立大专生 · 喜欢花和电影</p>
            </div>
            <button
              type="button"
              className="absolute bottom-5 right-4 grid size-11 place-items-center rounded-full bg-white text-primary shadow-lg"
              aria-label="喜欢"
            >
              <Heart className="size-5 fill-primary" />
            </button>
            <button
              type="button"
              className="absolute bottom-20 right-4 grid size-11 place-items-center rounded-full bg-white/90 text-foreground/55 shadow-lg"
              aria-label="暂不喜欢"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto bg-white">
            <CardContent className="space-y-4 p-4">
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground">我的小事</p>
                <p className="mt-1 text-[13px] leading-5 text-foreground/75">
                  喜欢日落落进窗户的瞬间，也喜欢把普通的一天认真收藏起来。
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">慢热但真诚</Badge>
                <Badge variant="outline">偶尔话很多</Badge>
                <Badge variant="outline">电影爱好者</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" />
                杭州 · 距离你 3.2km
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["from-[#eedcff] to-[#9f83e7]", "from-[#fde2ed] to-[#d484ae]", "from-[#e5e4ff] to-[#7d75b8]"].map(
                  (gradient) => (
                    <div key={gradient} className={`aspect-square rounded-2xl bg-gradient-to-br ${gradient}`} />
                  ),
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      <ProfileNudge onContinue={onNext} />
    </PageFrame>
  );
}
