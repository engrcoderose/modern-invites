-- Run manually in the Supabase SQL Editor for the affected deployment.
-- Read-only: schema, grants, policies, constraints, and trigger metadata only.
-- No guest records, household records, authentication tokens, or credentials.
begin read only;

-- Household editing reads all five columns and updates only the final three.
with expected_columns(column_name, update_required) as (
  values
    ('id', false),
    ('event_id', false),
    ('household_name', true),
    ('max_attendees', true),
    ('updated_at', true)
), column_diagnostics as (
select expected.column_name,
       expected.update_required,
       attribute.attnum is not null as column_exists,
       case when attribute.attnum is not null then
         has_column_privilege('authenticated', 'public.invitations', expected.column_name, 'SELECT')
       end as authenticated_can_select,
       case when attribute.attnum is not null then
         has_column_privilege('authenticated', 'public.invitations', expected.column_name, 'UPDATE')
       end as authenticated_can_update
from expected_columns as expected
left join pg_attribute as attribute
  on attribute.attrelid = to_regclass('public.invitations')
 and attribute.attname = expected.column_name
 and attribute.attnum > 0
 and not attribute.attisdropped
)
-- One result keeps all checks visible when the SQL Editor shows only the final
-- SELECT result. Copy this metadata object to share the diagnostic results.
select jsonb_build_object(
  'columns', (select jsonb_agg(to_jsonb(column_diagnostics) order by column_name) from column_diagnostics),
  'row_level_security_enabled', (
    select relrowsecurity from pg_class where oid = to_regclass('public.invitations')
  ),
  'policies', (
    select coalesce(jsonb_agg(to_jsonb(policies)), '[]'::jsonb)
    from (
      select policyname, cmd, roles, qual, with_check
      from pg_policies
      where schemaname = 'public' and tablename = 'invitations'
        and cmd in ('ALL', 'SELECT', 'UPDATE')
      order by cmd, policyname
    ) as policies
  ),
  'constraints', (
    select coalesce(jsonb_agg(to_jsonb(constraints)), '[]'::jsonb)
    from (
      select conname as constraint_name, pg_get_constraintdef(oid) as definition
      from pg_constraint
      where conrelid = to_regclass('public.invitations') and contype in ('c', 'u')
      order by conname
    ) as constraints
  ),
  'triggers', (
    select coalesce(jsonb_agg(to_jsonb(triggers)), '[]'::jsonb)
    from (
      select tgname as trigger_name, pg_get_triggerdef(oid) as definition
      from pg_trigger
      where tgrelid = to_regclass('public.invitations') and not tgisinternal
      order by tgname
    ) as triggers
  )
) as household_update_diagnostics;

commit;
