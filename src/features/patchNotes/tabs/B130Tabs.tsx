import { AlertTriangle, Award, CalendarDays, Hammer, MessageSquare, Sparkles, Star, Swords, UserCog } from 'lucide-react';
import { Card, SectionTitle } from '../../../components/ui';
import { patchNotesB130PorIdioma } from '../../../data/patchNotesB130';
import { useIdioma } from '../../../i18n/useIdioma';

const ListaDisc = ({ itens }: { itens: string[] }) => (
  <ul className="list-disc space-y-1 pl-5 text-slate-400">
    {itens.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export const B130_03_BugFixesTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_03;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={AlertTriangle} />

      <Card className="border-red-900/30 bg-red-950/10">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
          <AlertTriangle className="h-5 w-5" /> {conteudo.cardTitle}
        </h3>
        <ul className="space-y-4 text-sm text-slate-300">
          {conteudo.issues.map((issue) => (
            <li key={issue.main} className="border-b border-slate-800/60 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <span>{issue.main}</span>
              </div>
              {issue.notes ? (
                <div className="pl-6 pt-2 text-slate-400 italic">
                  {issue.notes.map((note) => (
                    <p key={note}>• {note}</p>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export const B130_02_RewardsTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_02.rewards;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={Award} />

      <Card className="mb-8 border-l-4 border-l-sky-500 bg-slate-800/30">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-sky-400">
          <MessageSquare className="h-5 w-5" /> {conteudo.devNoteTitle}
        </h3>
        <div className="space-y-3 text-sm italic text-slate-300">
          {conteudo.devNoteParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-amber-400">{conteudo.leftCardTitle}</h3>
          <div className="space-y-4 text-sm text-slate-300">
            {conteudo.leftSections.map((section) => (
              <div key={section.title} className="border-t border-slate-700/50 pt-3 first:border-t-0 first:pt-0">
                <h4 className={`mb-1 font-bold ${section.title.includes('Ghillieglade') ? 'flex items-center gap-2 text-amber-200' : 'text-sky-200'}`}>
                  {section.title.includes('Ghillieglade') ? <Star className="h-4 w-4" /> : null}
                  {section.title}
                </h4>
                <ListaDisc itens={section.items} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-sky-400">{conteudo.rightCardTitle}</h3>
          <div className="space-y-4 text-sm text-slate-300">
            {conteudo.rightSections.map((section) => (
              <div key={section.title} className="border-t border-slate-700/50 pt-3 first:border-t-0 first:pt-0">
                <h4 className="mb-1 font-bold text-slate-200">{section.title}</h4>
                <ListaDisc itens={section.items} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const B130_02_ClassesTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_02.classes;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={UserCog} />

      <Card className="mb-8 border-l-4 border-l-amber-500 bg-slate-800/30">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-400">
          <MessageSquare className="h-5 w-5" /> {conteudo.heroTitle}
        </h3>
        <div className="space-y-3 text-sm italic text-slate-300">
          {conteudo.heroParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {conteudo.cards.map((card) => (
          <Card key={card.title}>
            <h3 className="mb-4 text-lg font-bold text-slate-100">{card.title}</h3>
            <div className="space-y-4 text-sm text-slate-300">
              {card.sections.map((section) => (
                <div key={section.title} className="border-t border-slate-700/50 pt-3 first:border-t-0 first:pt-0">
                  <strong className="mb-1 block text-slate-100">{section.title}</strong>
                  <p className="text-slate-300">{section.description}</p>
                  {section.notes ? (
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-400">
                      {section.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const B130_02_SystemTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_02.system;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={AlertTriangle} />

      <Card className="border-red-900/30 bg-red-950/10">
        <ListaDisc itens={conteudo.issues} />
      </Card>
    </div>
  );
};

export const B130_01_BattlePassTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_01.battlePass;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={Award} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-t-4 border-t-sky-500">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-sky-400">
            <CalendarDays className="h-5 w-5" />
            {conteudo.leftTitle}
          </h3>
          <p className="mb-4 text-slate-300">{conteudo.leftDescription}</p>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-amber-200">{conteudo.leftBoxTop}</p>
            <p className="mt-2 text-sm text-slate-300">{conteudo.leftBoxBottom}</p>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Sparkles className="h-5 w-5 text-sky-400" />
            {conteudo.rightTitle}
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {conteudo.rewards.map((reward) => (
              <li key={reward} className="flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${reward.includes('500 TERA Coins') ? 'bg-sky-400' : 'bg-amber-500'}`} />
                <span className={reward.includes('500 TERA Coins') ? 'font-bold text-sky-300' : ''}>{reward}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export const B130_01_DungeonsTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_01.dungeons;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={Swords} />

      <Card className="mb-6 border-l-4 border-l-red-500">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="flex items-center gap-2 text-xl font-bold text-red-400">{conteudo.featured.title}</h3>
          <div className="text-right">
            <span className="block text-sm font-bold text-amber-500">{conteudo.featured.itemLevel}</span>
            <span className="block text-xs text-slate-400">{conteudo.featured.entryLimit}</span>
          </div>
        </div>
        <div className="grid gap-6 text-sm text-slate-300 md:grid-cols-2">
          <div>
            {conteudo.featured.leftGroups.map((group) => (
              <div key={group.title} className="mb-4">
                <h4 className="mb-2 font-semibold text-slate-200">{group.title}</h4>
                <ListaDisc itens={group.items} />
              </div>
            ))}
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-amber-300">{conteudo.featured.rightTitle}</h4>
            <ListaDisc itens={conteudo.featured.rightItems} />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {conteudo.cards.map((card) => (
          <Card key={card.title}>
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-bold text-slate-200">{card.title}</h3>
              <div className="text-right">
                <span className="block text-xs font-bold text-amber-500">{card.levelLine}</span>
                {card.locationLine ? <span className="block text-xs text-slate-400">{card.locationLine}</span> : null}
              </div>
            </div>
            {card.intro ? <p className="mb-2 text-sm text-slate-300">{card.intro}</p> : null}
            <ListaDisc itens={card.items} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export const B130_01_CraftingItemsTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_01.crafting;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={Hammer} />

      <Card className="mb-6">
        <h3 className="mb-4 text-lg font-bold text-sky-400">{conteudo.heroTitle}</h3>
        <p className="mb-4 text-sm text-slate-300">{conteudo.heroDescription}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {conteudo.bulkCards.map((card) => (
            <div key={card.title} className="rounded border border-slate-700 bg-slate-800/50 p-4">
              <h4 className="mb-2 font-bold text-sky-200">{card.title}</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {card.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-bold text-amber-400">{conteudo.leftTitle}</h3>
          <div className="space-y-4 text-sm text-slate-300">
            {conteudo.leftSections.map((section) => (
              <div key={section.title} className="border-t border-slate-700/50 pt-2 first:border-t-0 first:pt-0">
                <h4 className="font-bold text-slate-200">{section.title}</h4>
                <ListaDisc itens={section.items} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-bold text-sky-400">{conteudo.rightTitle}</h3>
          <ListaDisc itens={conteudo.rightItems} />
        </Card>
      </div>
    </div>
  );
};

export const B130_01_ClassesTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_01.classes;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={UserCog} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {conteudo.cards.map((card) => (
          <Card key={card.title} className={card.title === 'System Messages' ? 'bg-slate-800/30' : ''}>
            <h3 className="mb-2 font-bold text-slate-200">{card.title}</h3>
            <div className="space-y-3 text-sm text-slate-300">
              {card.sections.map((section) => (
                <div key={`${card.title}-${section.title}`}>
                  <p className="mb-1 font-medium text-slate-200">{section.title}</p>
                  {section.description ? <p className="text-xs text-slate-400">{section.description}</p> : null}
                  {section.items ? <ListaDisc itens={section.items} /> : null}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const B130_01_SystemTab = () => {
  const { idioma } = useIdioma();
  const conteudo = patchNotesB130PorIdioma[idioma].b130_01.system;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={conteudo.sectionTitle} icon={AlertTriangle} />

      <Card className="border-red-900/30 bg-red-950/10">
        <ListaDisc itens={conteudo.issues} />
      </Card>
    </div>
  );
};
