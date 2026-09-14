import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function IndexRedirect() {
  const headersList = await headers();
  const role = headersList.get('x-user-role') || 'ADMIN';

  if (role === 'RESIDENT' || role === 'UNIT_OWNER') {
    redirect('/resident');
  } else if (role === 'STAFF' || role === 'MAINTENANCE') {
    redirect('/maintenance');
  } else {
    redirect('/admin');
  }
}
